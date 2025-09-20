import { Avatar, Box, Button, Container, Divider, IconButton, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ArrowLeft, ChevronLeft, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getAllUsers = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setUsers(data)
            console.log("Data", data)
            setLoading(false)
        } catch (err) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <Container disableGutters maxWidth='sm' sx={{ paddingY: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', }}>
                    <ArrowLeft size={35} />
                </IconButton>
                <Typography variant='h3' sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Users
                </Typography>
                <IconButton sx={{ color: 'white', opacity: 0, cursor: 'default' }}>
                    <ArrowLeft />
                </IconButton>
            </Box>

            <Box sx={{ border: '1px solid white', borderRadius: '20px', paddingY: 1.5, paddingX: 3 }}>
                {loading
                    ?
                    <>
                        {Array.from({ length: 3 }).map(() => (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', paddingY: 1.5 }}>
                                <Skeleton variant='circular' height={40} width={40} sx={{ backgroundColor: 'var(--loading-color)' }} />
                                <Skeleton variant='rounded' height={60} width={'100%'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                            </Box>
                        ))}
                    </>
                    :
                    users?.map((user, index) => (
                        <Box key={user._id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, paddingY: 1.5, borderBottom: (users.length - 1) !== index ? '1px solid grey' : 'none' }}>
                            {user.profilePic ? <img src={user.profilePic} /> : <Avatar />}
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: '15px' }}>{user.name}</Typography>
                                <Typography sx={{ fontSize: '13px', color: 'grey' }}>@{user.username}</Typography>
                                <Typography sx={{ fontSize: '13px', color: 'grey' }}>{user?.posts.length} posts</Typography>
                            </Box>
                            <Button sx={{
                                // background: 'white',
                                color: 'white',
                                textTransform: 'capitalize',
                                '&:hover': {
                                    color: 'rgb(145, 145, 145)',
                                }
                            }}>
                                <Trash />
                            </Button>
                        </Box>
                    ))}
            </Box>

        </Container >
    )
}

export default Users
