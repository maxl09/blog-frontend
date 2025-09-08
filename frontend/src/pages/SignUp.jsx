import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { use, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'Name is required'
        if (!username) newErrors.username = 'Username is required'

        if (!/[A-Z]/.test(password)) newErrors.password = 'Password must include an uppercase letter';
        if (!/[0-9]/.test(password)) newErrors.password = 'Password must include a number';
        if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

        // Confirm password
        if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSignup = async () => {

        if (!validate()) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.message) {
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                alert(data.message);
            } else if (data.error) {
                alert(data.error);
            }
        } catch (err) {
            console.error('Something went wrong')
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
                    {errors.name && <Typography variant='body2' sx={{ color: 'red', marginBottom: 1 }}>{errors.name}</Typography>}
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
                                        {showPassword ? <VisibilityOffIcon sx={{ color: 'black' }} /> : <VisibilityIcon sx={{ color: 'black' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <Typography variant='body2' sx={{ color: 'red', marginBottom: 1 }}>{errors.password}</Typography>}

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
                                        {showPassword ? <VisibilityOffIcon sx={{ color: 'black' }} /> : <VisibilityIcon sx={{ color: 'black' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <Typography variant='body2' sx={{ color: 'red', marginBottom: 1 }}>{errors.confirmPassword}</Typography>}
                    <Button
                        onClick={handleSignup}
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
