import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme, useMediaQuery } from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

const SkillCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(17, 17, 17, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const SkillItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(4),
  fontWeight: 'bold',
}));

const Skills = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsData = [
    {
      category: 'Programming',
      color: '#FF6B6B',
      skills: [
        { name: 'Python', level: 65, color: '#4B8BBE' },
        { name: 'JavaScript', level: 60, color: '#F7DF1E' },
        { name: 'C++', level: 70, color: '#00599C' },
        { name: 'TypeScript', level: 60, color: '#3178C6' },
        { name: 'Latex', level: 50, color: '#3178C6' },
      ]
    },
    {
      category: 'Web',
      color: '#4ECDC4',
      skills: [
        { name: 'React.js', level: 55, color: '#61DAFB' },
        { name: 'Node.js', level: 50, color: '#339933' },
        { name: 'HTML/CSS', level: 80, color: '#E34F26' },
        { name: 'Git', level: 90, color: '#F05032' },
        { name: 'Docker', level: 60, color: '#2496ED' },
        { name: 'AWS', level: 45, color: '#FF9900' },
        { name: 'Firebase', level: 50, color: '#FFCA28' },
        { name: 'GraphQL', level: 40, color: '#E10098' },
      ]
    },
    {
      category: 'Database',
      color: '#96CEB4',
      skills: [
        { name: 'MongoDB', level: 55, color: '#47A248' },
        { name: 'PostgreSQL', level: 40, color: '#336791' },
        { name: 'MySQL', level: 40, color: '#4479A1' },
        { name: 'Redis', level: 35, color: '#DC382D' },
        { name: 'Cassandra', level: 40, color: '#1287B1' },
        { name: 'Oracle', level: 35, color: '#F80000' },
        { name: 'SQLite', level: 50, color: '#0F80CC' },
      ]
    },
    {
      category: 'OS',
      color: '#9B89B3',
      skills: [
        { name: 'Ubuntu', level: 80, color: '#E95420' },
        { name: 'Kali Linux', level: 70, color: '#557C94' },
        { name: 'Elementary OS', level: 80, color: '#64BAFF' },
        { name: 'Parrot OS', level: 65, color: '#04BFBF' },
        { name: 'Pop OS', level: 70, color: '#48B9C7' },
        { name: 'Zorin OS', level: 80, color: '#15A6F0' },
        { name: 'Arch Linux', level: 50, color: '#1793D1' },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
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
    <StyledContainer maxWidth="xl">
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: { xs: 4, sm: 6 },
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          background: `linear-gradient(45deg, #2196F3, #21CBF7)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '-1px',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        Skills & Expertise
      </Typography>

      {skillsData.map((category, categoryIndex) => (
        <Box key={categoryIndex} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          <GradientText variant="h3" align="center" sx={{ color: category.color }}>
            {category.category}
          </GradientText>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <motion.div variants={itemVariants}>
                <SkillCard elevation={0}>
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.name}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                          {skill.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {skill.level}%
                        </Typography>
                      </Box>
                      <StyledLinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          animation: 'progress 1s ease-in-out forwards',
                          '@keyframes progress': {
                            '0%': {
                              width: '0%',
                            },
                            '100%': {
                              width: '100%',
                            },
                          },
                        }}
                      />
                    </SkillItem>
                  ))}
                </SkillCard>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      ))}
    </StyledContainer>
  );
};

export default Skills;
