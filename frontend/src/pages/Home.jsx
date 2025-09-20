import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import PostCard from '../components/PostCard';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import { getPostsQuery, deletePostMutation, getUserProfileQuery, createLikeMutation, createSavedMutation, createCommentMutation } from '../context/query';

const Home = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const navigate = useNavigate();

    const getPosts = async () => {
        const posts = await getPostsQuery();
        setPosts(posts);
        console.log('posts: ', posts)
    }

    const getUserProfile = async () => {
        const user = await getUserProfileQuery();
        setUserProfile(user)
    }

    const deletePost = async (postId) => {
        await deletePostMutation(postId);
        getPosts();
    }

    const createLike = async (postId) => {
        await createLikeMutation();
        getPosts();
    }

    const createSaved = async (postId) => {
        await createSavedMutation(postId);
        getPosts();
    }

    const createComment = async (text, postId) => {
        await createCommentMutation(text, postId)
    }

    useEffect(() => {
        getPosts();
        getUserProfile();
    }, []);

    return (
        <>
            <Container disableGutters maxWidth='sm'
                sx={{
                    paddingY: 3,
                    paddingX: 10,
                }}>
                {posts?.length === 0
                    ? <Box sx={{
                        height: '100%',
                        paddingTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: 4
                    }}>
                        <Typography variant='h5'>No posts</Typography>
                    </Box>
                    : posts?.map((post) => (
                        <PostCard
                            post={post}
                            userProfile={userProfile}
                            createLike={createLike}
                            createSaved={createSaved}
                            createComment={createComment}
                            deletePost={deletePost} />
                    ))}
            </Container >
        </>

    )
}

export default Home
