import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';



const PostCard = () => {
    return (
        <Box sx={{ marginTop: 3, paddingBottom: 1.5, borderBottom: '1px solid rgb(36, 36, 36)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <Avatar sx={{ cursor: 'pointer' }} />
                    <Typography variant='body1' sx={{ fontWeight: 700, marginLeft: 1, cursor: 'pointer' }}>ngokienhuy_bap</Typography>
                    <Typography variant='body1'>•</Typography>
                    <Typography variant='body1' sx={{ color: 'rgb(203, 203, 203)' }}>1d</Typography>
                </Box>
                <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            <Box sx={{ borderRadius: '5px' }}>
                <img src='/images/post-image.jpg' alt="" style={{ width: '100%', borderRadius: '5px', border: '1px solid rgb(70, 70, 70)', }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <Heart />
                    </IconButton>
                    <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <MessageCircle />
                    </IconButton>
                    <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                        <Send />
                    </IconButton>
                </Box>
                <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                    <Bookmark />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'start', gap: 0.7 }}>
                    <Typography variant='body1'><span style={{ fontWeight: 700, cursor: 'pointer' }}>ngokienhuy_bap</span><span style={{ marginLeft: '5px' }}>Thở oxy hồi hộp chờ 2 Ngày 1 Đêm mùa 4 nhó 😤 </span></Typography>
                </Box>
            </Box>
            <Typography sx={{ color: 'rgb(127, 127, 127)', marginTop: 1, cursor: 'pointer' }}>View all 5 comments</Typography>
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
                                edge="start"
                            >
                                <InsertEmoticonOutlinedIcon sx={{ color: 'rgb(127, 127, 127)', '&:hover': { color: 'rgb(89, 89, 89)' } }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}

export default PostCard
