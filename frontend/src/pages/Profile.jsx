import { Avatar, Box, Button, Container, Grid, Icon, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { Bookmark, CircleAlert, Grid3x3, Heart, ImageDown, LayoutList, MessageCircle, PhoneIcon, TableProperties, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Profile = () => {

    const [value, setValue] = useState(0);
    const { userId } = useParams();
    const { user } = useAuth();
    const currentUser = user;
    const [userProfile, setUserProfile] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    // const [savedPostIds, setSavedPostIds] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // const images = ['/public/images/post-image.jpg', '/public/images/bg-img.jpeg', '/public/images/junvu-img.jpg', '/public/images/photography-img.jpeg']

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUserProfile = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setUserProfile(data)
            console.log("User Data", data)
            return data;
            // setLoading(false)
        } catch (err) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        } finally {
            setLoading(false);
        }
    }

    const getMyPosts = async (savedIds) => {
        try {
            // setLoading(true)
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            const posts = data.filter((data) => data.author._id === userId);
            setMyPosts(posts);
            console.log("My Posts Data", data)
            const savedPost = data.filter(item => savedIds.includes(item._id))
            console.log('saved posts', savedPost)
            setSavedPosts(savedPost);
            // setLoading(false)
        } catch (err) {
            console.error("Error:", err.message)
            console.error('Something went wrong')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getUserProfile();   // wait until finished
            await getMyPosts(profile.saved);       // then run this
        };

        fetchData();
    }, [userId]);

    return (
        <Container disableGutters maxWidth='md' sx={{
            paddingY: 7,
        }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ width: '150px', height: '150px' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* <Typography variant='h6'>User ID: {userId}</Typography> */}
                        {loading
                            ? <Skeleton width={'100px'} height={'30px'} sx={{ backgroundColor: 'var(--loading-color)' }} />
                            : <Typography variant='h6'>{userProfile.username}</Typography>
                        }
                        <Button sx={{
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: '7px',
                            padding: '4px 15px',
                            textTransform: 'none',
                            background: 'rgba(43, 48, 54, .8)',
                            '&:hover': { background: 'rgba(54, 60, 68, 1)' }
                        }}>Edit profile</Button>
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
                            }}></span>
                            followers
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>0</span>
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
            <Box sx={{ marginTop: 6, borderBottom: '1px solid #3A3B3C', width: '100%' }}>
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
                                        <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>20</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                        <MessageCircle strokeWidth={2.5} size={27} />
                                        <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>20</Typography>
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
                                            <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>20</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.7 }}>
                                            <MessageCircle strokeWidth={2.5} size={27} />
                                            <Typography sx={{ fontWeight: 700, fontSize: '17px' }}>20</Typography>
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