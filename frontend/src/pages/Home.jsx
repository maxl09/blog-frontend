import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

    const [message, setMessage] = useState("");

    useEffect(() => {
        // const token = localStorage.getItem("token");

        // fetch(`${import.meta.env.VITE_API_URL}/`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => setMessage(data.message))
        //     .catch(err => console.error("Error:", err));
        const token = localStorage.getItem('token');

        fetch("https://blog-backend-jkni.onrender.com/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => console.log("Protected data:", data))
            .catch(err => console.error("Error:", err));

    }, []);

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
