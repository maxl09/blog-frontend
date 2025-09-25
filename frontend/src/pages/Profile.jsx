import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, Skeleton, Tab, Tabs, TextField, Typography } from '@mui/material'
import { Bookmark, CircleAlert, Grid3x3, Heart, ImageDown, ImageUp, MessageCircle, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { createFollowMutation, editProfileMutation, getAllUsersQuery, getPostsQuery, getUserProfileQuery, updateProfilePicMutation } from '../context/query';
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
            const user = await getUserProfileQuery(userId);
            setUserProfile(user);
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
        setIsFollowed(Boolean(userProfile?.followers?.some(follower => follower === user.id)))
    }, [userProfile])

    const [openEditProfilePopup, setEditProfilePopup] = useState(false);

    const handleOpenEditProfile = () => {
        setEditProfilePopup(true)
    }

    const handleCloseEditProfile = () => {
        setEditProfilePopup(false)
    }
    // const [username, setUsername] = useState(null);
    // const handleUsernameChange = (e) => {
    //     setUsername(e.target.value)
    // }

    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function getUsers() {
            const users = await getAllUsersQuery();
            setUsers(users);
        }
        getUsers();
    }, [])

    const [formData, setFormData] = useState({})

    const handleEditProfileChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (userProfile) {
            setFormData({
                userId: userId,
                username: userProfile.username,
                name: userProfile.name,
                bio: userProfile.bio || ''
            })
        }
    }, [userProfile, userId])

    const handleEditProfileSubmit = async () => {
        if (users.some(user => user.username === formData.username && user._id !== formData.userId)) {
            toast('Username already taken')
            return;
        }
        if (!formData.username) {
            toast('Username cannot be empty')
            return;
        }
        if (!formData.name) {
            toast('Name cannot be empty')
            return;
        }
        try {
            await editProfileMutation(formData)
            handleCloseEditProfile();
        } catch (error) {
            console.log("Error saving profile: ", error)
        }
        console.log('users', users)
        console.log('Form data edit', formData)
    }

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

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 3, marginLeft: 9, width: '100%' }}>
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
                            }}
                                onClick={handleOpenEditProfile}
                            >Edit profile</Button>}
                        <Dialog
                            open={openEditProfilePopup}
                            onClose={handleCloseEditProfile}
                            PaperProps={{
                                sx: {
                                    // border: '1px solid white',
                                    borderRadius: 3,
                                    width: '100%',
                                },
                            }}>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogContent sx={{ background: 'black', color: 'white', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant='h7' sx={{ marginTop: 2 }}>Username</Typography>
                                <TextField
                                    name='username'
                                    placeholder='Username'
                                    // defaultValue={userProfile.username}
                                    value={formData.username}
                                    onChange={handleEditProfileChange}
                                    sx={{
                                        marginBottom: 0.5,
                                        '& .MuiOutlinedInput-root': {
                                            color: 'var(--primary-text-color)',
                                            '& fieldset': {
                                                borderColor: 'var(--primary-text-color)',   // normal state
                                                borderRadius: '15px'
                                            },
                                            '&:hover fieldset': {
                                                // hover state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            '&.Mui-focused fieldset': { // focused state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: 1,
                                            }
                                        },
                                    }}>
                                </TextField>
                                <Typography variant='h7'>Name</Typography>
                                <TextField
                                    placeholder='Name'
                                    defaultValue={userProfile.name}
                                    name='name'
                                    value={formData.name}
                                    onChange={handleEditProfileChange}
                                    sx={{
                                        marginBottom: 0.5,
                                        '& .MuiOutlinedInput-root': {
                                            color: 'var(--primary-text-color)',
                                            '& fieldset': {
                                                borderColor: 'var(--primary-text-color)',   // normal state
                                                borderRadius: '15px'
                                            },
                                            '&:hover fieldset': {
                                                // hover state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            '&.Mui-focused fieldset': { // focused state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: 1,
                                            }
                                        },
                                    }}>
                                </TextField>
                                <Typography variant='h7'>Bio</Typography>
                                <TextField
                                    placeholder='Bio'
                                    name='bio'
                                    value={formData.bio}
                                    defaultValue={userProfile.bio}
                                    onChange={handleEditProfileChange}
                                    multiline
                                    rows={7}
                                    sx={{
                                        marginBottom: 0.5,
                                        '& .MuiOutlinedInput-root': {
                                            color: 'var(--primary-text-color)',
                                            '& fieldset': {
                                                borderColor: 'var(--primary-text-color)',   // normal state
                                                borderRadius: '15px'
                                            },
                                            '&:hover fieldset': {
                                                // hover state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            '&.Mui-focused fieldset': { // focused state
                                                borderColor: 'var(--primary-text-color)',
                                            },
                                            ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: 1,
                                            }
                                        },
                                    }}>
                                </TextField>
                            </DialogContent>
                            <DialogActions sx={{ background: 'black', color: 'white' }}>
                                <Button
                                    onClick={handleEditProfileSubmit}
                                    sx={{ background: 'rgba(74, 93, 249,1)', border: '1px solid rgba(74, 93, 249,1)', color: 'white', fontWeight: 700, textTransform: 'none', borderRadius: '10px', }}>
                                    Save profile
                                </Button>
                                <Button onClick={handleCloseEditProfile}
                                    sx={{ background: 'black', color: 'white', border: '1px solid white', fontWeight: 700, textTransform: 'none', borderRadius: '10px', }}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                    <Box sx={{ marginTop: 1 }}>
                        <Typography sx={{ fontWeight: 700, textTransform: 'capitalize' }}>{userProfile?.name}</Typography>
                        {loading
                            ? <Skeleton width={'100px'} height={'30px'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                            : <Typography sx={{ marginTop: 2 }}>{userProfile?.bio}</Typography>}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ marginTop: 8, borderBottom: '1px solid #3A3B3C', width: '100%' }}>
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