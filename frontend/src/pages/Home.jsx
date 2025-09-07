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
import PostCard from '../components/PostCard';

const Home = () => {

    return (
        <>
            <Container disableGutters maxWidth='sm' sx={{
                paddingY: 5, paddingLeft: 0, paddingRight: 20
            }}>
                <PostCard />
                <PostCard />
            </Container >
        </>

    )
}

export default Home
