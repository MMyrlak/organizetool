import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/EmailVerification.css';
import gif from '../css/photo/emailVerif.gif';
import { Button } from 'primereact/button';
import {logoutUser} from '../backend/UserAction';

const EmailVerification = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    navigate('/task'); 
                }
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);
    const logout = () => {
        logoutUser();
        navigate('/login')
    }
    return (
        <div id="EmailVerification-page">
            <h1>Email nie został potwierdzony</h1>
            <img src={gif} alt="Email Verification" />
            <Button label="Wyloguj" severity="warning" onClick={() => logout()}>
            </Button>
        </div>
    );
};

export default EmailVerification;