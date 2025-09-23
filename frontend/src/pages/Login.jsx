import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let error = '';
        if (!username) error = 'Please enter your username'
        else if (!password) error = 'Please enter your password'

        if (error) {
            toast.error(error)
            return;
        }

        return true;

        // const newErrors = {}

        // if (!username) newErrors.username = 'Please enter your username'
        // if (!password) newErrors.password = 'Please enter your password'

        // setErrors(newErrors);

        // return Object.keys(newErrors).length === 0;
    }

    const handleLogin = async () => {
        if (!validate()) return;
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                // console.log('!res.ok')
                toast.error(data.error)
                // alert("Login failed !res.ok");
                return;
            }

            if (data.token) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect to frontend home page (React SPA)
                const capitalized = data.user.name
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast(`Welcome back, ${capitalized}!`)
                navigate('/')
                // window.location.href = "/";
            } else {
                toast.error(data.error)

                // alert(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            // alert();
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false);
        }


        // const data = await res.json();
        // if (data.token) {
        //     localStorage.setItem('token', data.token);
        //     window.location.href = "/";
        // } else {
        //     alert(data.error);
        // }

        // const data = await res.json();
        // if (data.token) {
        //     localStorage.setItem('token', data.token);

        //     // Example: verify token immediately
        //     const token = localStorage.getItem('token');
        //     const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}`
        //         }
        //     });

        //     const verifyData = await verifyRes.json();
        //     console.log("Protected route response:", verifyData);

        //     // Now redirect if needed
        //     window.location.href = "https://ply-instagram-clone.vercel.app/";
        // } else {
        //     alert(data.error);
        // }
    }

    // Show/hide password
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container fixed maxWidth='sm' sx={{ paddingY: 10 }}>
            <Box sx={{ border: '1px solid rgb(154, 154, 154)', borderRadius: '20px', padding: 4 }}>
                <Typography variant='h4' sx={{ marginBottom: 0.5, fontWeight: 600 }}>Login</Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, fontWeight: 300 }}>Enter your information to login to your account</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant='h7'>Username</Typography>
                    <TextField fullWidth
                        placeholder='Enter your username'
                        sx={{
                            marginBottom: 0.5,
                            '& .MuiOutlinedInput-root': {
                                color: 'var(--primary-text-color)',
                                '& fieldset': {
                                    borderColor: 'var(--primary-text-color)',   // normal state
                                },
                                '&:hover fieldset': {     // hover state
                                    borderColor: 'var(--primary-text-color)',
                                },
                                '&.Mui-focused fieldset': { // focused state
                                    borderColor: 'var(--primary-text-color)',
                                },
                            },
                        }}
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin()
                            }
                        }} />
                    {errors.username && <Typography variant='body2' sx={{ color: 'red', marginBottom: 1 }}>{errors.username}</Typography>}
                    <Typography variant='h7'>Password</Typography>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        placeholder='Enter your password'
                        sx={{
                            marginBottom: 0.5,
                            '& .MuiOutlinedInput-root': {
                                color: 'var(--primary-text-color)',
                                '& fieldset': {
                                    borderColor: 'var(--primary-text-color)',   // normal state
                                },
                                '&:hover fieldset': {     // hover state
                                    borderColor: 'var(--primary-text-color)',
                                },
                                '&.Mui-focused fieldset': { // focused state
                                    borderColor: 'var(--primary-text-color)',
                                },
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffIcon sx={{ color: 'var(--foreground-color)' }} /> : <VisibilityIcon sx={{ color: 'var(--foreground-color)' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin()
                            }
                        }
                        } />
                    {errors.password && <Typography variant='body2' sx={{ color: 'red', marginBottom: 1 }}>{errors.password}</Typography>}
                    {/* <Typography component='a' href='/' sx={{ textDecoration: 'none', color: 'black', textAlign: 'end', marginTop: 1, '&:hover': { color: 'rgba(63, 63, 63, 0.84)' } }}>Forgot Password?</Typography> */}
                    <Button
                        onClick={handleLogin}
                        loading={loading}
                        sx={{
                            marginTop: 3,
                            paddingY: 1.2,
                            background: 'var(--foreground-color)',
                            color: 'var(--background-color)',
                            '&:hover': {
                                background: 'rgb(211, 211, 211)'
                            }
                        }}>
                        Đăng nhập
                    </Button>
                    <Typography
                        sx={{ marginTop: 5, textAlign: 'center' }}>Don't have an account? <span><a href='/signup' style={{ textDecoration: 'underline', color: 'var(--primary-text-color)', fontWeight: 500 }}>Sign up</a></span></Typography>
                </Box>
            </Box>
        </Container >
    );
}

export default Login
