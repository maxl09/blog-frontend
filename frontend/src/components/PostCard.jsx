import { Avatar, Box, Button, Container, IconButton, InputAdornment, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';


function postCreatedAt(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + 'y';
    if (months > 0) return months + 'm';
    if (weeks > 0) return weeks + 'w';
    if (days > 0) return days + 'd';
    if (hours > 0) return hours + 'h';
    if (minutes > 0) return minutes + 'm';
    return seconds + 's';
}

const PostCard = ({ post, userProfile, createLike, createSaved, deletePost }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenThreeDots = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseThreeDots = () => {
        setAnchorEl(null)
    }

    const [likes, setLikes] = useState(post.likes || []);
    const [isLiked, setIsLiked] = useState(Boolean(post.likes.some(like => like === user.id)));

    const handleLike = async () => {
        await createLike(post._id); // call backend
        if (likes.some(like => like === user.id)) {
            setLikes(likes.filter(item => item !== user.id))
            setIsLiked(false)
        } else {
            setLikes([...likes, user.id])
            setIsLiked(true)
        }
    };

    const [animate, setAnimate] = useState(false);

    const handleDoubleClick = () => {
        handleLike();
        setAnimate(true);
        // Remove animation after it finishes
        setTimeout(() => setAnimate(false), 800);
    };

    const [saved, setSaved] = useState(userProfile.saved || []);
    const [isSaved, setIsSaved] = useState(Boolean(userProfile.saved?.some(item => item === post._id)));
    console.log('saved', userProfile.saved)
    console.log('BooL', userProfile.saved?.some(item => item === post._id))
    console.log('post', post.caption)
    const handleCreateSaved = async () => {
        await createSaved(post._id);
        if (saved.some(item => item === post._id)) {
            setSaved(saved.filter(item => item !== post._id))
            setIsSaved(false)
        } else {
            setSaved([...saved, post._id])
            setIsSaved(true)
        }
        toast(`Post ${!isSaved ? 'saved' : 'unsaved'}`);
    }

    return (
        <Box sx={{ marginTop: 3, paddingBottom: 1.5, borderBottom: '1px solid rgb(36, 36, 36)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <Avatar sx={{ cursor: 'pointer' }} />
                    <Typography onClick={() => navigate(`/user/${post.author._id}`)} variant='body1' sx={{ fontWeight: 700, marginLeft: 1, cursor: 'pointer' }}>{post.author.username}</Typography>
                    <Typography variant='body1'>•</Typography>
                    <Typography variant='body1' sx={{ color: 'rgb(183, 183, 183)' }}>{postCreatedAt(post.createdAt)}</Typography>
                </Box>
                <IconButton sx={{
                    color: 'white',
                    '&:hover': { color: 'rgb(212, 212, 212)' },
                    display: (user?.isAdmin || post?.author._id === user?.id) ? 'flex' : 'none'
                }}>
                    <MoreHorizIcon onClick={handleOpenThreeDots} />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseThreeDots}>
                        <MenuItem onClick={() => deletePost(post?._id)}>Delete</MenuItem>
                    </Menu>
                </IconButton>
            </Box>
            <Box
                onDoubleClick={handleDoubleClick}
                sx={{ width: '100%', cursor: 'pointer', borderRadius: '5px', marginTop: 1, position: 'relative' }}>
                <img src={post.image} alt="" style={{ width: '100%', minHeight: '50%', height: '600px', objectFit: 'cover', borderRadius: '5px', border: '1px solid rgb(70, 70, 70)', }} />
                <Heart fill='red' stroke='red' size={100} style={{
                    position: 'absolute', top: '40%', left: '40%', opacity: 0,
                    transition: '0.3s opacity ease-in',
                    opacity: animate ? 1 : 0,
                }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleLike} sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <Heart
                            fill={isLiked ? 'red' : 'transparent'}
                            stroke={isLiked ? 'red' : 'white'}
                        />
                    </IconButton>
                    <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <MessageCircle size={21} />
                    </IconButton>
                    <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <Send />
                    </IconButton>
                </Box>
                <IconButton onClick={handleCreateSaved} sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                    <Bookmark fill={isSaved ? 'white' : 'transparent'} />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant='body1' sx={{ fontWeight: 700, marginY: 0.5 }}>{likes.length < 2 ? `${likes.length} like` : `${likes.length} likes`}</Typography>
                    <Typography variant='body1'><span style={{ fontWeight: 700, cursor: 'pointer' }}>{post.author.username}</span><span style={{ marginLeft: '5px' }}>{post.caption}</span></Typography>
                </Box>
            </Box>
            {/* <Typography sx={{ color: 'rgb(127, 127, 127)', marginTop: 1, cursor: 'pointer' }}>View all 5 comments</Typography> */}
            <TextField
                placeholder='Add a comment...'
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        padding: 0,
                        color: 'var(--primary-text-color)',
                        '& fieldset': {
                            padding: 0,
                            borderColor: 'black',   // normal state
                        },
                        '&:hover fieldset': {     // hover state
                            borderColor: 'black',
                        },
                        '&.Mui-focused fieldset': { // focused state
                            borderColor: 'black',
                        },
                    },
                    '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
                        paddingX: 0.2,
                        paddingY: 1,
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                                edge="start">
                                <InsertEmoticonOutlinedIcon sx={{ color: 'rgb(127, 127, 127)', '&:hover': { color: 'rgb(89, 89, 89)' } }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box >
    )
}

export default PostCard
