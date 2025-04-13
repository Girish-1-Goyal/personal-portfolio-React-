import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  useTheme,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
}));

const ProjectCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.primary.main}30`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 240,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: `${theme.palette.primary.main}15`,
  border: `1px solid ${theme.palette.primary.main}30`,
  '&:hover': {
    background: `${theme.palette.primary.main}25`,
  },
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const Projects = () => {
  const theme = useTheme();

  const projects = [
    {
      title: 'Modern Portfolio',
      description: 'A modern portfolio website built with React and Material-UI, featuring smooth animations and a responsive design.',
      technologies: ['React', 'Material-UI', 'Framer Motion'],
      github: 'https://github.com/Girish-1-Goyal/personal-portfolio-React-',
      demo: 'https://your-portfolio-url.com',
    },
    {
      title: 'Web Terminal',
      description: 'Built an interactive web terminal emulator mimicking Ubuntu’s CLI experience using React.js, custom hooks, and dynamic command parsing',
      technologies: ['React', 'Python', 'Flask'],
      github: 'https://github.com/Girish-1-Goyal/WebTerminal-Project-',
      demo: 'https://webterm-u.netlify.app/',
    },
    {
      title: 'Data Structures Handbook',
      description: 'A handbook in Data Structures for begineers to advanced in LATEX',
      technologies: ['Latex'],
      github: 'https://github.com/Girish-1-Goyal/dsa-handbook',
      demo: 'https://drive.google.com/file/d/12CLQ1KWekgsH4rcJUSxIJmH-d_iVN0ae/view?usp=drive_link',
    },
    {
      title: 'Terminal',
      description: 'Developed a basic command-line shell in C++, supporting command parsing, execution, and built-in commands like cd, exit, and pwd.Gained hands-on experience with process handling, system calls, and input parsing in a Unix-like environment.',
      technologies: ['C'],
      github: 'https://github.com/Girish-1-Goyal/Terminal-C-Simple',
      demo: '#',
    },
    {
      title: 'Coding Club Website(In Development)',
      description: 'Coding club website helps to host coding contest and students can participate into that contest on college basis',
      technologies: ['PostgreSQL', 'SQLite', 'React', 'JWT'],
      github: 'https://github.com/Girish-1-Goyal/Coding-Club-Website-Project-',
      demo: '#',
    },
    {
      title: 'Book Rental Website(In Development)',
      description: 'Interactive platform for Rent Books and Return Back as you Want',
      technologies: ['Firebase', 'React', 'Authentication'],
      github: 'https://github.com/Girish-1-Goyal/Book-Project',
      demo: '#',
    },
  ];

  return (
    <StyledContainer>
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
            fontWeight: 'bold',
          }}
        >
          Featured Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <ProjectCard
                component={motion.div}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <StyledCardMedia
                    title={project.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      p: 1,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Tooltip title="View Source">
                      <IconButton
                        component="a"
                        href={project.github}
                        target="_blank"
                        sx={{
                          background: `${theme.palette.background.paper}80`,
                          backdropFilter: 'blur(4px)',
                          '&:hover': {
                            background: theme.palette.background.paper,
                          },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Live Demo">
                      <IconButton
                        component="a"
                        href={project.demo}
                        target="_blank"
                        disabled={index > 2}
                        sx={{
                          background: `${theme.palette.background.paper}80`,
                          backdropFilter: 'blur(4px)',
                          '&:hover': {
                            background: theme.palette.background.paper,
                          },
                          '&.Mui-disabled': {
                            background: theme.palette.action.disabledBackground,
                            color: theme.palette.action.disabled,
                          },
                        }}
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <ProjectTitle variant="h5">
                    {project.title}
                  </ProjectTitle>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies.map((tech, index) => (
                      <TechChip
                        key={index}
                        label={tech}
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    href={project.github}
                    target="_blank"
                    startIcon={<GitHubIcon />}
                    sx={{
                      borderColor: `${theme.palette.primary.main}50`,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    Source Code
                  </Button>
                  <Button
                    variant="contained"
                    href={project.demo}
                    target="_blank"
                    endIcon={<LaunchIcon />}
                    disabled={index > 2}
                    sx={{
                      ml: 'auto',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                      '&.Mui-disabled': {
                        background: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled,
                      },
                    }}
                  >
                    Live Demo
                  </Button>
                </CardActions>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </StyledContainer>
  );
};

export default Projects;
