import { Avatar, Box, Button, Container, Grid, Icon, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { Bookmark, CircleAlert, Grid3x3, Heart, ImageDown, ImageUp, MessageCircle, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { createFollowMutation, getPostsQuery, getUserProfileQuery, updateProfilePicMutation } from '../context/query';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const { userId } = useParams();
    const { user } = useAuth();
    const currentUser = user;
    const [userProfile, setUserProfile] = useState([]);
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState('')
    const [myPosts, setMyPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleProfilePicChange = async () => {
        const file = event.target.files[0]
        if (file) {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
            const compressedFile = await imageCompression(file, options);
            setImage(compressedFile)
            setPreview(URL.createObjectURL(compressedFile))
        }
    }

    const handleProfilePicSubmit = async (image, userId) => {
        await updateProfilePicMutation(image, userId)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const profile = await getUserProfileQuery(userId);   // wait until finished
            setUserProfile(profile)
            setLoading(false)

            // Get all posts
            const posts = await getPostsQuery();
            // Get only posts owned
            setMyPosts(posts.filter(post => post.author._id === userId));
            // Get only posts saved
            const savedPost = posts.filter(post => profile.saved.includes(post._id))
            setSavedPosts(savedPost);
        };
        fetchData();
    }, [userId]);

    // Follower & Following
    const [followers, setFollowers] = useState([]);
    const [isFollowed, setIsFollowed] = useState(null);
    const handleFollowSubmit = async () => {
        try {
            await createFollowMutation(userId);
            if (isFollowed) {
                setFollowers(followers.filter(prev => prev !== userId))
                setIsFollowed(false)
                toast('Unfollowed')
            } else {
                setFollowers([...followers, userId])
                setIsFollowed(true)
                toast('Following')
            }
        } catch (error) {
            console.log('Error creating follow:', error)
        }
    }

    useEffect(() => {
        setFollowers(userProfile.followers)
        setIsFollowed(Boolean(userProfile.followers?.includes(user.id)))
    }, [userProfile.followers])

    return (
        <Container disableGutters maxWidth='md' sx={{
            paddingY: 7,
            width: '100%'
        }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <label htmlFor='upload-image'>
                        <Box component='div' sx={{ cursor: 'pointer', position: 'relative', "&:hover .profilePicOverlay": { opacity: 1 } }}>
                            {preview
                                ? <img src={preview} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} />
                                : userProfile.profilePic ? <img src={userProfile.profilePic} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} />
                                    : <Avatar sx={{ width: '150px', height: '150px' }} />
                            }
                            {userId === currentUser.id
                                && <Box className="profilePicOverlay"
                                    sx={{
                                        position: 'absolute',
                                        top: '0%',
                                        left: '0',
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 99,
                                        background: 'rgba(22, 22, 22, 0.7)',
                                        opacity: 0
                                    }}>
                                    <Box>
                                        <ImageUp strokeWidth={2} />
                                        <Typography variant='body2' sx={{ fontWeight: 700 }}>Change Photo</Typography>
                                    </Box>
                                </Box>}
                        </Box>
                    </label>
                    {userId === currentUser.id &&
                        <input
                            accept='image/*'
                            id='upload-image'
                            type="file"
                            onChange={handleProfilePicChange}
                            style={{ display: 'none' }}
                        />}
                    {preview && <Button
                        onClick={() => handleProfilePicSubmit(image, userId)}
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: '8%',
                            marginTop: 2,
                            fontWeight: 700,
                            fontSize: '14px',
                            textTransform: 'none',
                            textWrap: 'nowrap',
                            background: 'rgba(74, 93, 249,1)',
                            color: 'white',
                            borderRadius: '10px',
                            width: 'fit-content',
                            paddingX: 2, paddingY: 0.5,
                            '&:hover': {
                                background: 'rgba(74, 94, 249, 0.8)'
                            }
                        }}>
                        Save changes
                    </Button>}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* <Typography variant='h6'>User ID: {userId}</Typography> */}
                        {loading
                            ? <Skeleton width={'100px'} height={'30px'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                            : <Typography variant='h6'>{userProfile.username}</Typography>
                        }
                        {(currentUser.id === userId)
                            && <Button sx={{
                                color: 'white',
                                fontWeight: 700,
                                borderRadius: '7px',
                                padding: '4px 15px',
                                textTransform: 'none',
                                background: 'rgba(43, 48, 54, .8)',
                                '&:hover': { background: 'rgba(54, 60, 68, 1)' }
                            }}>Edit profile</Button>}
                        {(currentUser.id !== userId) && <Button
                            onClick={handleFollowSubmit}
                            sx={{
                                fontWeight: 700,
                                fontSize: '14px',
                                textTransform: 'none',
                                textWrap: 'nowrap',
                                background: isFollowed ? 'rgb(85, 85, 85)' : 'rgba(74, 93, 249,1)',
                                color: 'white',
                                borderRadius: '10px',
                                width: 'fit-content',
                                paddingX: 2, paddingY: 0.5,
                                '&:hover': {
                                    background: isFollowed ? 'rgba(85, 85, 85, 0.58)' : 'rgba(74, 94, 249, 0.8)'
                                }
                            }}>
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </Button>}

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '50%' }}>
                        <Typography sx={{ display: 'flex', gap: '5px', alignItems: 'center', color: 'rgba(168, 168, 168, 1)' }}>
                            {loading
                                ? <Skeleton width={'10px'} height={'32px'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                                : <span style={{
                                    fontWeight: 700, color: 'white'
                                }}>{myPosts.length}</span>}

                            {myPosts.length > 1 ? 'posts' : 'post'}
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>{followers?.length}</span>
                            followers
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>{userProfile?.following?.length}</span>
                            following
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: userProfile.bio ? 0 : 5 }}>
                        <Typography sx={{ fontWeight: 700, textTransform: 'capitalize' }}>{userProfile?.name}</Typography>
                        {loading
                            ? <Skeleton width={'100px'} height={'30px'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                            : <Typography>{userProfile?.bio}</Typography>}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginTop: 10, borderBottom: '1px solid #3A3B3C', width: '100%' }}>
                <Tabs value={value} onChange={handleChange} sx={{
                    width: '100%',
                    '& .MuiTabs-list': { display: 'flex', justifyContent: 'center', gap: '10%' },
                    '& .MuiTabs-indicator': {
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }
                }}>
                    <Tab icon={<Grid3x3 />} sx={{
                        color: 'grey',
                        '&.Mui-selected': {
                            color: 'white',
                            borderBottomColor: 'white',
                        }
                    }} />
                    <Tab icon={<Bookmark />} sx={{
                        color: 'grey',
                        '&.Mui-selected': {
                            color: 'white',
                            borderBottomColor: 'white',
                        }
                    }} />
                    <Tab icon={<ImageDown />} sx={{
                        color: 'grey',
                        '&.Mui-selected': {
                            color: 'white',
                            borderBottomColor: 'white',
                        }
                    }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box>
                    <Grid container spacing={0.3}>
                        {myPosts.map((post, index) => (
                            <Grid size={4} key={index} sx={{ position: 'relative' }} >
                                <Box className='overlay'
                                    onClick={() => navigate(`/post/${post._id}`)}
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        minHeight: '400px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.78)',
                                        opacity: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 3.5,
                                        transition: '0.3s opacity ease', cursor: 'pointer',
                                        '&:hover': {
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                        <Heart strokeWidth={2.5} size={30} />
                                        <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>{post.likes.length}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                        <MessageCircle strokeWidth={2.5} size={27} />
                                        <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>{post.comments.length}</Typography>
                                    </Box>
                                </Box>
                                <img src={post.image} alt="" style={{ width: '100%', minHeight: '100%', height: '400px', objectFit: 'cover' }} />
                            </Grid>))}
                    </Grid>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box>
                    {userId !== currentUser.id
                        ? <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                            <TriangleAlert strokeWidth={2.75} size={35} />
                            <Typography variant='h6'>
                                Their saved posts are not accessible!
                            </Typography>
                        </Box>
                        :
                        <Grid container spacing={0.3} sx={{ height: '400px' }}>
                            {savedPosts.map((post, index) => (
                                <Grid size={4} key={index} sx={{ position: 'relative' }} >
                                    <Box className='overlay'
                                        onClick={() => navigate(`/post/${post._id}`)}
                                        sx={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            minHeight: '400px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.78)',
                                            opacity: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 3.5,
                                            transition: '0.3s opacity ease', cursor: 'pointer',
                                            '&:hover': {
                                                opacity: 1
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                            <Heart strokeWidth={2.5} size={30} />
                                            <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>{post.likes.length}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                            <MessageCircle strokeWidth={2.5} size={27} />
                                            <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>{post.comments.length}</Typography>
                                        </Box>
                                    </Box>
                                    <img src={post.image} alt="" style={{ width: '100%', minHeight: '100%', height: '400px', objectFit: 'cover' }} />
                                </Grid>))}
                            { }
                        </Grid>}
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                    <CircleAlert strokeWidth={2.75} size={35} />
                    <Typography variant='h6'>
                        Tagged Unavailable
                    </Typography>
                </Box>
            </CustomTabPanel>
        </Container >
    )
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}
export default Profile