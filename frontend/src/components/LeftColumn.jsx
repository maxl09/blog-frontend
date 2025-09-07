import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
// import { ThemeContext } from '../theme';

const LeftColumn = () => {
    const navigate = useNavigate();

    const menu = [
        { icon: HomeIcon, label: 'Home', path: '/' },
        { icon: SearchIcon, label: 'Search', path: '/search' },
        { icon: AccountCircleIcon, label: 'Profile', path: '/profile' },
        { icon: LogoutIcon, label: 'Logout', path: '/login' },
    ]

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login')
    // }

    const handleClick = (path) => {
        if (path === '/login') localStorage.removeItem('token'); // logout button
        navigate(path)
    }

    return (
        <Box sx={{ minWidth: 'fit-content', width: '15%', height: '100vh', borderRight: '2px solid rgba(71, 71, 71, 0.55)', paddingX: 1.5 }}>
            <Box component={'a'} href='/' sx={{ height: 'fit-content', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', paddingY: 5, paddingX: 1.5 }}>
                <img src='/public/images/instagram-logo.png' alt="instagram logo" width={'150px'} />
            </Box>
            {menu.map((item) =>
                <Box
                    onClick={() => handleClick(item.path)}
                    sx={{
                        display: 'flex',
                        gap: 1.6,
                        justifyContent: 'start',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: 1.4,
                        marginY: 0.7,
                        borderRadius: 2,
                        '&:hover': {
                            background: 'rgb(24, 24, 24)'
                        },
                    }}>

                    <item.icon />
                    <Typography variant='h7' sx={{ fontWeight: 400 }}>{item.label}</Typography>
                </Box>
            )}

        </Box >
    )
}

export default LeftColumn
