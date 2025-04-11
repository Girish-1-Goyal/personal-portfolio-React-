import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Instagram,
  Email,
  LocationOn,
  Phone,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
  padding: theme.spacing(6, 0, 4),
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0, 3),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(72, 219, 251, 0.1) 0%, rgba(29, 209, 161, 0.05) 100%)',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(1),
  transition: 'all 0.3s ease',
  background: 'rgba(72, 219, 251, 0.1)',
  backdropFilter: 'blur(10px)',
  width: '40px',
  height: '40px',
  [theme.breakpoints.down('sm')]: {
    width: '35px',
    height: '35px',
    margin: theme.spacing(0.5),
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    background: 'rgba(72, 219, 251, 0.2)',
    boxShadow: '0 0 15px rgba(72, 219, 251, 0.3)',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
    marginBottom: theme.spacing(0.75),
  },
  '&:hover': {
    color: '#48dbfb',
    transform: 'translateX(5px)',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #48dbfb, #1dd1a1)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
    marginBottom: theme.spacing(1.5),
  },
}));

const ResponsiveContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/Girish-1-Goyal', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/girish-kumar-goyal-189152198/', label: 'LinkedIn' },
    { icon: <Twitter />, url: 'https://x.com/GirishkumarGoy5', label: 'Twitter' },
    { icon: <Instagram />, url: 'https://www.instagram.com/girish_k_goyal/', label: 'Instagram' },
    { icon: <Email />, url: 'mailto:girishgoyal15144214@gmail.com', label: 'Email' },
  ];

  const contactInfo = [
    { icon: <Email />, text: 'girishgoyal15144214@gmail.com', url: 'mailto:girishgoyal15144214@gmail.com' },
    { icon: <Phone />, text: '+91 8006591948', url: 'tel:+918006591948' },
    { icon: <LocationOn />, text: 'Bulandshahr, Uttar Pradesh, India', url: 'https://maps.google.com/?q=Mathura,Uttar+Pradesh,India' },
  ];

  return (
    <StyledFooter component="footer">
      <ResponsiveContainer maxWidth="lg">
        <Grid container spacing={isMobile ? 3 : 4}>
          {/* Profile Section */}
          <Grid item xs={12} sm={6} md={4}>
            <GradientText variant={isMobile ? "h6" : "h5"} gutterBottom>
              Girish Kumar Goyal
            </GradientText>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 2, 
                opacity: 0.9,
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: 1.5
              }}
            >
              Full Stack Developer & Competitive Programmer
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 0.5,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              {socialLinks.map((link, index) => (
                <SocialButton
                  key={index}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  size={isMobile ? "small" : "medium"}
                >
                  {link.icon}
                </SocialButton>
              ))}
            </Box>
          </Grid>

          {/* Contact Info Section */}
          <Grid item xs={12} sm={6} md={4}>
            <GradientText variant={isMobile ? "h6" : "h6"} gutterBottom>
              Contact Info
            </GradientText>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {contactInfo.map((info, index) => (
                <FooterLink
                  key={index}
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    wordBreak: 'break-word',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box component="span" sx={{ 
                    minWidth: '24px',
                    mt: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {info.icon}
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{
                      fontSize: isMobile ? '0.85rem' : '0.9rem',
                      lineHeight: 1.4
                    }}
                  >
                    {info.text}
                  </Typography>
                </FooterLink>
              ))}
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <GradientText variant={isMobile ? "h6" : "h6"} gutterBottom>
              Quick Links
            </GradientText>
            <Grid container spacing={1}>
              {['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact'].map((link) => (
                <Grid item xs={6} key={link}>
                  <FooterLink 
                    href={`#${link.toLowerCase()}`}
                    sx={{
                      justifyContent: isMobile ? 'center' : 'flex-start'
                    }}
                  >
                    <Typography 
                      variant="body2"
                      sx={{
                        fontSize: isMobile ? '0.85rem' : '0.9rem'
                      }}
                    >
                      {link}
                    </Typography>
                  </FooterLink>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: isMobile ? 3 : 4, 
          backgroundColor: 'rgba(255,255,255,0.1)' 
        }} />

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            opacity: 0.8,
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            pb: isMobile ? 1 : 0
          }}
        >
          {new Date().getFullYear()} Girish Kumar Goyal. All rights reserved.
        </Typography>
      </ResponsiveContainer>
    </StyledFooter>
  );
};

export default Footer;
