import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { SquarePlus, Users } from 'lucide-react';
import { useAuth } from '../context/useAuth';
// import { ThemeContext } from '../theme';

const LeftColumn = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const [openCreatePost, setOpenCreatePost] = useState(false);

    const menu = [
        { icon: HomeIcon, label: 'Home', path: '/' },
        { icon: SearchIcon, label: 'Search', path: '/search' },
        { icon: SquarePlus, label: 'Create', path: '/posts/create' },
        { icon: AccountCircleIcon, label: 'Profile', path: `/user/${user.id}` },
        { icon: Users, label: 'Users', path: '/users' },
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
    // Logout
    const handleOpenLogout = () => {
        setOpenLogoutDialog(true);
    }

    const handleCloseLogout = () => {
        setOpenLogoutDialog(false)
    }

    return (
        <Box sx={{ width: '15%' }}>
            <Box sx={{
                position: 'fixed', minWidth: 'fit-content',
                width: '15%', height: '100vh',
                borderRight: '2px solid rgba(71, 71, 71, 0.55)',
                paddingX: 1.5
            }}>
                <Box component={'a'} href='/' sx={{ height: 'fit-content', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', paddingY: 5, paddingX: 1.5 }}>
                    <img src='/images/instagram-logo.png' alt="instagram logo" width={'150px'} />
                </Box>
                {menu.filter((item) => item.path !== '/users' || user?.isAdmin)
                    .map((item) =>
                        <Box
                            onClick={item.path !== '/login' ? () => handleClick(item.path) : () => handleOpenLogout()}
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

                {/* For Logout */}
                <Dialog
                    open={openLogoutDialog}
                    onClose={handleCloseLogout}
                    PaperProps={{
                        sx: {
                            border: '1px solid white', // your border color
                            borderRadius: 3,             // optional: rounded corners
                        },
                    }}
                >
                    <DialogContent sx={{ background: 'black', color: 'white' }}>
                        Are you sure you want to logout?
                    </DialogContent>
                    <DialogActions sx={{ background: 'black', color: 'white' }}>
                        <Button onClick={() => handleClick('/login')} sx={{ background: 'white', color: 'black' }}>
                            Yes
                        </Button>
                        <Button onClick={handleCloseLogout}
                            sx={{ background: 'black', color: 'white', border: '1px solid white' }}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box >
        </Box >
    )
}

export default LeftColumn
