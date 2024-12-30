import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({ children }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`);
                if (response.status === 200) {
                    setIsAuthorized(true);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            verifyAdmin();
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : null;
};

export default Auth;