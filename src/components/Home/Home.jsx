import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '4rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 3,
  fontSize: '1.1rem',
  textTransform: 'none',
  marginRight: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginRight: 0,
  },
}));

const BackgroundPattern = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.05,
  background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)',
  backgroundSize: '50px 50px',
});

const ProfileImage = styled(motion.img)({
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center 2%',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  border: '4px solid rgba(255, 255, 255, 0.1)',
});

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <HeroSection id="home">
      <BackgroundPattern />
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  👋 Hello, I'm
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <GradientText variant="h1">
                  Girish Kumar Goyal
                </GradientText>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 3,
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      'Competitive programmer',
                      2000,
                      'Developer(Backend/Frontend)',
                      2000,
                      'Mentor',
                      2000,
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                  />
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    maxWidth: 600,
                  }}
                >
                  A passionate software developer with a strong foundation in computer science,
                  specializing in full-stack development and competitive programming. Graduate of
                  GL Bajaj Group of Institutions, Mathura, with a Bachelor's degree in Computer Science
                  and Engineering.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={(theme) => ({
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: theme.spacing(2),
                })}>
                  <ActionButton
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get in Touch
                  </ActionButton>
                  <ActionButton
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    sx={{
                      background: 'transparent',
                      border: (theme) => `2px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        background: 'rgba(255,255,255,0.05)',
                      },
                    }}
                  >
                    View Projects
                  </ActionButton>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                variants={itemVariants}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <ProfileImage
                  src="/profile.jpg"
                  alt="Girish Kumar Goyal"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default Home;
