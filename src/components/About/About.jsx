import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  useTheme,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(18, 18, 18, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, transparent 100%)`,
    zIndex: 1,
  },
}));

const About = () => {
  const theme = useTheme();

  const skills = [
    'Problem Solving',
    'Data Structures',
    'Algorithms',
    'System Design',
    'Web Development',
    'Database Design',
    'API Development',
    'Cloud Computing',
    'C++',
    'Python',
    'React',
    'System Design',
    'Docker',
    
  ];

  const achievements = [
    'Solved 200+ problems on Codeforces',
    'Developed multiple full-stack applications',
    'Active open-source contributor',
    'Competitive programming enthusiast',
  ];

  return (
    <StyledContainer maxWidth="lg" id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 6,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          About Me
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h4" gutterBottom color="primary">
                  Who I Am
                </Typography>
                <Typography variant="body1" paragraph>
                  I'm Girish Kumar Goyal, a passionate Developer and a competitive programmer with a strong foundation in computer science. I graduated with a B.Tech in Computer Science and have been actively involved in competitive programming and web development.
                </Typography>
                <Typography variant="body1" paragraph>
                  My journey in technology has been driven by a constant desire to learn and create. I specialize in building scalable web applications and solving complex algorithmic problems.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" gutterBottom color="primary">
                    Key Achievements
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {achievements.map((achievement, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
                            mr: 2,
                          }}
                        />
                        <Typography variant="body1">
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h4" gutterBottom color="primary">
                  Skills & Expertise
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        '&:hover': {
                          background: `${theme.palette.primary.main}20`,
                        },
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="h5" gutterBottom color="primary">
                  Education
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6">
                    B.Tech in Computer Science
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    GL Bajaj Group of Institutions
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    2018 - 2022
                  </Typography>
                </Box>

                <Typography variant="h5" gutterBottom color="primary">
                  Current Focus
                </Typography>
                <Typography variant="body1">
                  Currently, I'm focused on expanding my expertise in modern web technologies, system design, and competitive programming. I'm also actively contributing to open-source projects and building innovative solutions to real-world problems.
                </Typography>
              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>
      </motion.div>
    </StyledContainer>
  );
};

export default About;
