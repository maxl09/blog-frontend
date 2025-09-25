import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createCommentMutation, createLikeMutation, createSavedMutation, deleteCommentMutation, getPostsQuery, getUserProfileQuery } from "../context/query";
import { useEffect, useRef, useState } from "react";
import { Bookmark, Heart, MessageCircle, Send, Trash2 } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { timeFormatShort } from "../utils/date-utils";
import { useIsSmallScreen } from "../utils/media-query";

const Post = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [post, setPost] = useState([])
    const [userProfile, setUserProfile] = useState([]);
    const { postId } = useParams();

    const handleFocusComment = () => {
        if (inputRef.current)
            inputRef.current.focus();
    }

    const getPost = async () => {
        const posts = await getPostsQuery();
        console.log('posts', posts)
        const post = posts.find(post => post._id === postId);
        setPost(post);
    }

    const getUserProfile = async () => {
        const user = await getUserProfileQuery();
        setUserProfile(user);
    }

    const [likes, setLikes] = useState(post.likes || []);
    const [isLiked, setIsLiked] = useState(false);

    // console.log('isLiked: ', post.likes?.some(like => like === user.id))
    // console.log('isLiked: ', isLiked)


    const handleLike = async () => {
        await createLikeMutation(postId);
        if (isLiked) {
            setLikes(likes.filter(like => like !== user.id))
            setIsLiked(false)
        } else {
            setLikes([...likes, user.id])
            setIsLiked(true)
        }
    }

    const [isSaved, setIsSaved] = useState(false);

    // console.log('isSaved: ', userProfile?.saved?.some(saved => saved === post._id))
    // console.log('isSaved: ', isSaved)


    const handleCreateSaved = async () => {
        await createSavedMutation(postId);
        if (isSaved) {
            setIsSaved(false)
        } else {
            setIsSaved(true)
        }
    }

    useEffect(() => {
        getPost();
        getUserProfile();
    }, [])

    useEffect(() => {
        setLikes(post?.likes || []);
        setIsLiked(post?.likes?.some(like => like === user.id) || false);
    }, [post?.likes, user?.id])

    useEffect(() => {
        setIsSaved(userProfile?.saved?.some(saved => saved === post._id) || false);
    }, [post?._id])

    // Create comment
    const [commentValue, setCommentValue] = useState('');
    const [postComments, setPostComments] = useState([])

    const handleCommentChange = (e) => {
        setCommentValue(e.target.value)
    }

    const handleCreateComment = async () => {
        if (commentValue.trim().length !== 0) {
            try {
                const newComment = await createCommentMutation(commentValue, post._id)
                setPostComments([...postComments, newComment])
                setCommentValue('');
            } catch (error) {
                console.log('Error creating comment: ', error)
            }
        }
    }

    useEffect(() => {
        setPostComments(post?.comments)
    }, [post.comments])

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteCommentMutation(post._id, commentId);
            setPostComments(prev => prev.filter(comment => comment._id !== commentId))
        } catch (error) {
            console.log('Error delete comment', error)
        }
    }

    const isSmallScreen = useIsSmallScreen();

    return (
        <Container disableGutters maxWidth='lg'
            sx={{
                paddingTop: isSmallScreen ? 3 : 5,
                paddingBottom: isSmallScreen ? 3 : 5,
                paddingLeft: isSmallScreen ? 3 : 15,
                paddingRight: isSmallScreen ? 3 : 3,
                // marginBottom: '100px'

            }}>
            <Box sx={{ height: isSmallScreen ? 'calc(100vh - 110px)' : '89vh', display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                <Box sx={{ width: isSmallScreen ? '100%' : '60%', height: isSmallScreen ? '25%' : '100%', cursor: 'pointer' }}>
                    <img src={post?.image} alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ width: isSmallScreen ? '100%' : '60%', height: '100%', background: '#202328', borderRadius: isSmallScreen ? '0 0 10px 10px' : '0px 10px 10px 0', padding: '20px 10px 10px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1.2, cursor: 'pointer' }}>
                            {post?.author?.profilePic ? <img src={post.author.profilePic} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} /> : <Avatar></Avatar>}
                            <Typography onClick={() => navigate(`/user/${post.author._id}`)} sx={{ fontWeight: 600 }}>{post?.author?.username}</Typography>
                        </Box>
                        <Typography sx={{ paddingY: 1.5, borderBottom: '1px solid rgb(62, 62, 62)' }}>{post?.caption}</Typography>
                        <Box sx={{ height: isSmallScreen ? '30vh' : '50vh', overflowY: 'auto' }}>
                            {postComments?.map((comment) => (
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'start', marginTop: 1.5 }}>
                                        <Avatar sx={{ width: '30px', height: '30px', marginTop: 0.4 }} />
                                        <Box>
                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 700, fontSize: isSmallScreen ? '14px' : '16px' }}>{comment?.author?.username} <span style={{ fontWeight: 400, fontSize: isSmallScreen ? '13px' : '15px', lineHeight: '5px' }}>{comment?.text}</span></Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ color: 'var(--loading-color)' }}>{timeFormatShort(comment?.createdAt)}</Typography>
                                        </Box>
                                    </Box>
                                    {(user.isAdmin || comment.author._id === user.id)
                                        && <IconButton onClick={() => handleDeleteComment(comment._id)}>
                                            <Trash2 strokeWidth={1.8} stroke="rgb(144, 144, 144)" size={18} />
                                        </IconButton>}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    onClick={handleLike}
                                    sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                                    <Heart
                                        fill={isLiked ? 'red' : 'transparent'}
                                        stroke={isLiked ? 'red' : 'white'}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={handleFocusComment}
                                    sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                                    <MessageCircle size={21} />
                                </IconButton>
                                <IconButton sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                                    <Send />
                                </IconButton>
                            </Box>
                            <IconButton
                                onClick={handleCreateSaved}
                                sx={{ color: 'white', '&:hover': { color: 'rgb(212, 212, 212)' } }}>
                                <Bookmark
                                    fill={isSaved ? 'white' : 'transparent'}
                                />
                            </IconButton>
                        </Box>
                        <Typography sx={{ fontWeight: 700 }}>{likes.length} {likes.length > 1 ? 'likes' : 'like'}</Typography>
                        <Typography variant="body2" sx={{ color: 'rgb(155, 155, 155)' }}>{timeFormatShort(post.createdAt) || 0} </Typography>
                        <TextField
                            placeholder='Add a comment...'
                            inputRef={inputRef}
                            value={commentValue}
                            onChange={handleCommentChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // avoid newline
                                    handleCreateComment();
                                }
                            }}
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    padding: 0,
                                    color: 'var(--primary-text-color)',
                                    '& fieldset': {
                                        padding: 0,
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent',
                                    },
                                },
                                '& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input': {
                                    paddingX: 0.2,
                                    paddingY: 1,
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='center'>
                                        <Button
                                            onClick={handleCreateComment}
                                            sx={{ textTransform: 'none', fontWeight: 700, color: 'rgb(176, 176, 176)' }}>Post</Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Container >
    );
}

export default Post
