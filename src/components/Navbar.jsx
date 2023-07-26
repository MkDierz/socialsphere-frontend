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
import { useState } from 'react';
import { Link } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import MainIcon from './MainIcon';
import { useAppSelector } from '../redux/store';
import { useLogoutMutation } from '../redux/api/authApi';

const pages = [
  { title: 'Home', to: '/home' },
];
const settings = [
  { title: 'Profile', to: '/profile' },
  { title: 'Account', to: '/settings' },
];

function Navbar() {
  const navigate = useNavigate();

  const { name, username } = useAppSelector((state) => state.user.user);
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [logout] = useLogoutMutation();

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

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MainIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SocialSphere
          </Typography>

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
              {pages.map(({ title, to }) => (
                <MenuItem key={title} onClick={() => { handleCloseNavMenu(); navigate(to); }}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MainIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SocialSphere
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, to }) => (
              <Button
                key={title}
                onClick={() => {
                  handleCloseUserMenu();
                  navigate(to);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button
                variant="text"
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0, fontFamily: 'sans-serif', textTransform: 'initial', color: 'text.primary',
                }}
                endIcon={(
                  <Avatar sx={{ bgcolor: red[500], textTransform: 'uppercase' }}>
                    {name?.split(' ').map((word) => word.charAt(0))}
                  </Avatar>
                  )}
              >
                {username}
              </Button>
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
              {settings.map(({ title, to }) => (
                <MenuItem key={title} onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    href={to}
                    textAlign="center"
                    sx={{
                      mr: 2,
                      display: 'flex',
                      fontFamily: 'sans-serif',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {title}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => {
                handleCloseUserMenu();
                logout({ accessToken, refreshToken });
              }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    mr: 2,
                    display: 'flex',
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
