import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { BloodtypeSharp } from '@mui/icons-material';
import { blueGrey, red } from '@mui/material/colors';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [
    { name: 'Profile', path: '/' },
    { name: 'Account', path: '/account' },
    { name: 'Dashboard', path: "/dashboard" }
];




function NavBar() {
    const { user, logOut } = useAuth()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);




    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {

        setAnchorElUser(null);
    };


    const handleLogOut = () => {
        logOut()
    }

    return (
        <AppBar position="static" sx={{ background: "transparent", bgcolor: blueGrey[800], opacity: 'inherit', }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BloodtypeSharp sx={{ display: { color: red[500], fontSize: 80, textShadow: '-ms-grid', xs: 'none', md: 'flex' }, my: 2, mr: 1 }} />
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"

                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },

                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: "whitesmoke",
                                textDecoration: 'none',
                            }}
                        >
                            Blood Donation
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,

                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Blood Donation
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user?.name} src={user?.photoURL} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, i) => (
                                <MenuItem key={i} onClick={handleCloseUserMenu}>
                                    <NavLink to={setting?.path}

                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Typography textAlign="center">{setting?.name}</Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                            <MenuItem>
                                {user ? <> <Button onClick={handleLogOut} variant='outlined' sx={{ fontSize: "16px", fontWeight: "200" }} >LogOut</Button></> : <><Link to='/login' ><Button variant='outlined' sx={{ fontSize: "16px", fontWeight: "200" }} >Login</Button> </Link></>}
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;


