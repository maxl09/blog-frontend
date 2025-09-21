import { Box, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard';
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
        await createLikeMutation(postId);
        // getPosts();
    }

    const createSaved = async (postId) => {
        await createSavedMutation(postId);
        // getPosts();
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
                    paddingTop: 3,
                    paddingBottom: 10,
                    paddingX: { xs: 3, sm: 10 },
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
                        {/* <Typography variant='h5'>No posts</Typography> */}
                        <CircularProgress sx={{ color: 'rgb(195, 195, 195)' }} />
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
