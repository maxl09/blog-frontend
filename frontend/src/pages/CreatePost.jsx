import { Avatar, Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CreatePostIcon from '../../public/images/create-post-icon'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreatePost = () => {
    const { user } = useAuth();
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState('')
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageOnChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    // const handleCaptionChange = (e) => {
    //     setCaption(e.target.value)
    // }

    const createPost = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append('caption', caption);
            if (image) formData.append('image', image);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/create`, {
                method: "POST",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await res.json();
            console.log("Post created:", data);
            navigate('/');
        } catch (error) {
            console.error("Error creating post:", error.message)
        } finally {
            toast.success('Post created successfully!')
            setLoading(false);
        }
    }

    return (
        <Container disableGutters maxWidth='md'
            sx={{
                paddingY: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
            {loading &&
                <Box sx={{
                    position: 'absolute',
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}>
                    <CircularProgress size={50} />
                </Box>}
            <Box sx={{
                width: '100%',
                height: '100%',
            }}>
                <Box sx={{ background: 'rgba(9, 9, 9, 0.83)', display: 'flex', alignItems: 'center', height: '50px' }}>
                    {preview && <IconButton onClick={() => setPreview(null)}>
                        <ArrowLeft color='white' />
                    </IconButton>}
                    <Typography sx={{ fontWeight: 700, textAlign: 'center', padding: 1, flex: 1 }}>
                        Create new post
                    </Typography>
                    {preview && <Button
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700
                        }}
                        onClick={createPost}
                    >
                        Share
                    </Button>}
                </Box>

                <Box sx={{ display: 'flex', width: '100%', height: 'calc(100% - 50px)' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, width: '100%', height: '100%', background: !preview && '#242526', backgroundImage: preview && `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0px 0px 0px 25px' }}>
                        {!preview && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
                            <CreatePostIcon />
                            <Typography variant='h6'>Drag photos and videos here</Typography>
                            <input
                                accept='image/*'
                                id='upload-image'
                                type="file"
                                onChange={handleImageOnChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor='upload-image'>
                                <Button
                                    component='span'
                                    sx={{
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        background: 'rgba(74, 93, 249,1)',
                                        color: 'white', borderRadius: '10px',
                                        paddingX: 2, paddingY: 0.5,
                                        '&:hover': {
                                            background: 'rgba(74, 94, 249, 0.8)'
                                        }
                                    }}>
                                    Select from computer
                                </Button>
                            </label>
                        </Box>}
                    </Box>
                    {preview && <Box sx={{ width: '45%', minHeight: '50%', background: '#242526', borderRadius: '0px 0px 25px 0px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: 2 }}>
                            {user.profilePic ? <img src={user.profilePic} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> : <Avatar />}
                            {console.log('profile pic', user)}
                            <Typography sx={{ fontWeight: 600 }}>{user.username}</Typography>
                        </Box>
                        <TextField
                            rows={10}
                            fullWidth
                            multiline
                            variant="standard"
                            placeholder='What do you want to share...'
                            sx={{ paddingX: 2 }}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            InputProps={{
                                disableUnderline: true, // removes the underline from "standard"
                                sx: {
                                    color: "white",
                                },
                            }} />
                    </Box>}
                </Box>
            </Box>

        </Container >
    )
}

export default CreatePost
