import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AdminAuth = ({ children }) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!cookies.token) {
                navigate('/');
                return;
            }

            try {
                const decode = jwtDecode(cookies.token);
                const response = await axios.get(`${import.meta.env.VITE_URL}admin/profile/${decode.id}`);
                
                if (response.status === 200) {
                    setIsAuthorized(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Authorization failed:', error);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [cookies.token, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Optionally display a loader
    }

    if (!isAuthorized) {
        return null; // Prevent rendering children if not authorized
    }

    return <>{children}</>;
};

export default AdminAuth;
