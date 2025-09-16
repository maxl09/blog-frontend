import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { use, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        let error = '';

        if (name.length < 3) error = "Name must be at least 3 characters";
        // else if (username.length < 6) error = "Username must be at least 6 characters";
        // else if (!/[A-Z]/.test(password)) error = "Password must include an uppercase letter";
        // else if (!/[0-9]/.test(password)) error = "Password must include a number";
        // else if (password.length < 8) error = "Password must be at least 8 characters";
        else if (confirmPassword !== password) error = "Passwords do not match";

        if (error) {
            toast.error(error);
            return;
        }

        return true;
    }

    const handleSignup = async () => {

        if (!validate()) return;
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, username, password })
            });

            const data = await res.json();
            if (data.message) {
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                // alert(data.message);
                toast.success(data.message)
                navigate('/login')
            } else if (data.error) {
                toast.error(data.error)
                // alert(data.error);
            }
            setLoading(false);
        } catch (err) {
            // console.error('Something went wrong')
            // toast.error(err.response?.data?.error || "Something went wrong");
            toast.error(err.data.error)
        }
    }

    // Show/hide password
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container fixed maxWidth='sm' sx={{ paddingY: 10 }}>
            <Box sx={{ border: '1px solid rgb(154, 154, 154)', borderRadius: '20px', padding: 4 }}>
                <Typography variant='h4' sx={{ marginBottom: 0.5, fontWeight: 600 }}>Create Account</Typography>
                <Typography variant='body2' sx={{ marginBottom: 3, fontWeight: 300 }}>Enter your information to create your account</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant='h7'>Full Name</Typography>
                    <TextField fullWidth
                        placeholder='Enter your full name'
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
                        onChange={(e) => setName(e.target.value)} />
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
                        onChange={(e) => setUsername(e.target.value)} />
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
                        onChange={(e) => setPassword(e.target.value)} />
                    <Typography variant='h7'>Confirm Password</Typography>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        placeholder='Confirm password'
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
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button
                        onClick={handleSignup}
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
                        Sign up
                    </Button>
                    <Typography
                        sx={{ marginTop: 5, textAlign: 'center' }}>Already have an account? <span><a href='/login' style={{ textDecoration: 'underline', color: 'var(--primary-text-color)', fontWeight: 500 }}>Log in</a></span></Typography>
                </Box>
            </Box>
        </Container >
    )
}

export default SignUp
