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
import { toast } from 'react-toastify';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const getPosts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setPosts(data)
            console.log("Data", data)
        } catch (error) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        }
    }


    const deletePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ postId })
            });
            const data = await res.json();
            console.log("Deleted Post", data);
            if (!res.ok) {
                toast.error('Cannot delete this post')
            } else {
                getPosts();
                toast('Post deleted successfully!');
            }
        } catch (error) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Container disableGutters maxWidth='sm'
                sx={{
                    paddingY: 3,
                    paddingX: 10,
                }}>
                {posts.length === 0
                    ? <Box sx={{ height: '100%', paddingTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', gap: 4 }}>
                        <Typography variant='h5'>No posts</Typography>
                    </Box>
                    : posts.map((post) => (
                        <PostCard post={post} deletePost={deletePost} />
                    ))}
            </Container >
        </>

    )
}

export default Home
