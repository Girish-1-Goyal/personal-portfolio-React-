import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  GitHub,
  Download,
  Code as CodeIcon,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme, transparent }) => ({
  background: transparent ? 'transparent' : 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)',
  backdropFilter: transparent ? 'none' : 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  boxShadow: transparent ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderBottom: transparent ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(2),
  width: '40px',
  height: '40px',
  minWidth: 'unset',
  padding: 0,
  borderRadius: '50%',
  color: '#fff',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  background: 'linear-gradient(45deg, #1A2980, #26D0CE)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    background: 'linear-gradient(45deg, #1A2980, #26D0CE)',
  },
  '@media (max-width: 900px)': {
    width: '35px',
    height: '35px',
  },
}));

const ButtonLabel = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: '-25px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0, 0, 0, 0.8)',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  '.MuiButton-root:hover &': {
    opacity: 1,
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 8,
    left: '50%',
    width: 0,
    height: 2,
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '60%',
  },
}));

const Navbar = ({ toggleTheme }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isTransparent, setIsTransparent] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const theme = useTheme();

  const pages = ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Competitive', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsTransparent(currentScroll < 50);
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const handleCodechefRedirect = () => {
    window.open('https://codeforces.com/profile/Girish_k_Goyal', '_blank');
  };

  const handleGithubRedirect = () => {
    window.open('https://github.com/Girish-1-Goyal', '_blank');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide appear={false} direction="down" in={visible}>
        <StyledAppBar position="fixed" transparent={isTransparent}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Girish Kumar Goyal
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <ScrollLink
                        to={page.toLowerCase()}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </ScrollLink>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  flexGrow: 1,
                  display: { xs: 'flex', md: 'none' },
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                GIRISH KUMAR GOYAL
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => (
                  <NavButton
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <ScrollLink
                      to={page.toLowerCase()}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {page}
                    </ScrollLink>
                  </NavButton>
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
                  {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </Slide>

      {/* Fixed position action buttons */}
      <ActionButton
        onClick={handleGithubRedirect}
        sx={{ bottom: '120px' }}
      >
        <ButtonLabel>GitHub</ButtonLabel>
        <GitHub />
      </ActionButton>

      <ActionButton
        onClick={handleCodechefRedirect}
        sx={{ bottom: '65px' }}
      >
        <ButtonLabel>Codeforces</ButtonLabel>
        <CodeIcon />
      </ActionButton>

      <ActionButton
        onClick={handleDownloadResume}
        sx={{ bottom: '10px' }}
      >
        <ButtonLabel>Resume</ButtonLabel>
        <Download />
      </ActionButton>
    </Box>
  );
};

export default Navbar;
