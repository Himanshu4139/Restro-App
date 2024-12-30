import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const UserAuth = ({ children }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                // Ensure admin exists
                const adminResponse = await axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`);
                if (adminResponse.status !== 200) {
                    navigate('/');
                    return;
                }

                // Verify token existence and validity
                if (!cookies.token) {
                    navigate('/');
                    return;
                }

                const decodedToken = jwtDecode(cookies.token);
                if (!decodedToken._id) {
                    navigate('/');
                    return;
                }

                // Verify user profile
                const userResponse = await axios.get(`${import.meta.env.VITE_URL}user/profile/${decodedToken._id}`);
                if (userResponse.status === 200 && userResponse.data.user._id === decodedToken._id) {
                    setIsAuthorized(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, [id, cookies.token, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Optional loading indicator
    }

    if (!isAuthorized) {
        return null; // Prevent rendering children if not authorized
    }

    return <>{children}</>;
};

export default UserAuth;
