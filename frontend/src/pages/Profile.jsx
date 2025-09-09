import { Avatar, Box, Button, Container, Icon, Tab, Tabs, Typography } from '@mui/material'
import { Bookmark, Grid3x3, ImageDown, LayoutList, PhoneIcon, TableProperties } from 'lucide-react'
import React from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Profile = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container disableGutters maxWidth='md' sx={{
            paddingY: 7
        }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ width: '150px', height: '150px' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant='h6'>ngokienhuy_bap</Typography>
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
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>27</span>
                            posts
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>88</span>
                            followers
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '5px', color: 'rgba(168, 168, 168, 1)' }}>
                            <span style={{
                                fontWeight: 700, color: 'white'
                            }}>300</span>
                            following
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 700 }}>Ngo Kien Huy</Typography>
                        <Typography>Vietnam</Typography>
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
                Posts
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Saved
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Tagged
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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}
export default Profile