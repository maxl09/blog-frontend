import { Avatar, Box, Container, IconButton, InputAdornment, Skeleton, TextField, Typography } from '@mui/material'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const getAllUsers = async () => {
        try {
            // setLoading(true)
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
            // setLoading(false)
        } catch (err) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const filteredUsers = users.filter(user => user.username.toLowerCase().startsWith(value.toLowerCase()) || user.name.toLowerCase().includes(value.toLowerCase()));

    return (
        <Container disableGutters maxWidth='sm'
            sx={{
                paddingY: 5,
                paddingX: 10,
            }}>
            <Typography variant='h5' sx={{ fontWeight: 700 }}>Search</Typography>
            <TextField
                placeholder='Search'
                value={value}
                onChange={handleChange}
                sx={{
                    marginTop: 3,
                    background: '#363636',
                    width: '100%',
                    borderRadius: 2,
                    paddingX: 1.7,
                    '& .MuiOutlinedInput-root': {
                        color: 'var(--primary-text-color)',
                        '& fieldset': {
                            border: 'none',   // normal state
                        },
                        '&:hover fieldset': {     // hover state
                            border: 'none'
                        },
                        '&.Mui-focused fieldset': { // focused state
                            border: 'none'
                        },
                    },
                    '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
                        paddingX: 0.2,
                        paddingY: 1,
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setValue('')}
                                sx={{
                                    background: 'rgb(207, 207, 207)',
                                    padding: 0.4,
                                    '&:hover': { background: 'rgb(135, 135, 135)' }
                                }}
                                edge="end">
                                <X size={12} strokeWidth={5} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{ marginTop: 3 }}>
                {filteredUsers.length === 0
                    ? <>
                        <Typography variant='body1' sx={{ color: 'rgb(173, 173, 173)', textAlign: 'center', fontWeight: 500, marginTop: 5 }}>
                            No results found.
                        </Typography>
                    </>
                    :
                    <Box sx={{ height: '70vh', overflowY: 'scroll' }}>
                        {value !== '' && filteredUsers.map((user) =>
                            <Box
                                onClick={() => navigate(`/user/${user._id}`)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 2,
                                    marginBottom: 1.5,
                                    borderRadius: 2,
                                    paddingY: 1,
                                    paddingX: 1.5,
                                    cursor: 'pointer',
                                    "&:hover": {
                                        background: 'rgba(75, 75, 75, 0.54)'
                                    }
                                }}>
                                <Avatar sx={{ width: '45px', height: '45px' }} />
                                <Box
                                    sx={{
                                        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'start', flexDirection: 'column',
                                    }}>
                                    <Typography variant='h7' sx={{ fontWeight: 600 }}>{user.username}</Typography>
                                    <Typography variant='body2' sx={{ color: 'rgb(173, 173, 173)' }}>{user.name}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box >
                }
            </Box>
        </Container>
    )
}

export default Search
