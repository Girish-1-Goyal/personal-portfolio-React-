import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Download as DownloadIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  FiberManualRecord as CircleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(17, 17, 17, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  height: '600px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
  '& .MuiCardContent-root': {
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: '4px',
  background: theme.palette.mode === 'dark' 
    ? `rgba(18, 18, 18, 0.8)`
    : `rgba(255, 255, 255, 0.8)`,
  border: `1px solid ${theme.palette.divider}`,
  backdropFilter: 'blur(10px)',
}));

const Resume = () => {
  const theme = useTheme();

  const resumeData = {
    education: [
      {
        degree: 'B.Tech in Computer Science',
        institution: 'GL Bajaj Group of Institutions, Mathura',
        year: '2018 - 2022',
        details: [
          'CGPA: 6.8/10(I - Division)',
          'Core courses: Data Structures, Algorithms, Database Management, Web Development, Compiler Design, Operating System',
          'Active member of coding club & Teach students about coding and Data structures and Algorithms.',
        ],
      },
      {
        degree: 'Higher Secondary Education',
        institution: 'CBSE Board',
        year: '2017 - 2018',
        details: [
          'Percentage: 68%',
          'Major subjects: Physics, Chemistry, Mathematics',
          'School Topper of NTA(Mathematics)',
        ],
      },
    ],
    experience: [
      {
        role: 'Frontend Studio Developer Intern',
        company: 'Knoldus LLP Softwares',
        year: '2021 - 2022',
        details: [
          'Develop a panel for a client with the team with best frontend and backend work with the framework like Angular and React with Docker and Kubernetes and CI/CD.',
          'Responsiblity of API integration handling and HTTPS requests in the Project and UI Designing of the project with Angular',
          'Collaborated with team members using Git and Agile methodologies',
          'Work with Frontend Team in the Leaderboard Project in Angular and Typescript',
        ],
      },
      {
        role: 'Competitive Programmer',
        company: 'Codeforces',
        year: '2025 - Present',
        details: [
          'Solved 1000+ programming problems across different platforms',
          'Achieved 1867(max) rating on Codeforces',
          'Regular participant in coding contests on various platfoms.',
          'Teach students about Data Structures and Algorithms',
        ],
      },
    ],
    skills: {
      technical: [
        'JavaScript', 'React.js', 'Node.js', 'TypeScript', 'Latex',
        'NoSQL', 'SQL', 'Python', 'Golang', 'C++',
        'Data Structures', 'Algorithms', 'Git', 'C', 'System Design','Docker', 'Kubernetes', 'Basic Java'
      ],
      soft: [
        'Problem Solving', 'Team Leadership', 'Communication',
        'Time Management', 'Adaptability', 'Quick Learning',
      ],
      Os: [
        'Ubuntu', 'Windows', 'kali Linux', 'Deepin OS',
        'Garuda Linux', 'Zorin OS', 'Elementary OS','Arch Linux','Parrot OS', 'Black Arch', 'Chrome OS', 'Fedora',
      ],
    },
    projects: [
      {
        name: 'Modern Portfolio',
        description: 'Personal portfolio website built with React.js and Material-UI',
        technologies: ['React.js', 'Material-UI', 'Framer Motion'],
      },
      {
        name: 'Web Terminal',
        description: 'Built an interactive web terminal emulator mimicking Ubuntus CLI experience using React.js, custom hooks, and dynamic command parsing.',
        technologies: ['React', 'Python', 'Flask'],
      },
      {
        name: 'Data Structures Handbook',
        description: 'Authored a comprehensive handbook covering key data structures (arrays, linked lists, trees, graphs, etc.) with detailed explanations, C++ code examples, and visual diagrams.Designed and typeset the entire document using LaTeX, ensuring professional formatting, clarity, and easy readability.',
        technologies: ['LATEX'],
      },
      {
        name: 'Terminal',
        description: 'Developed a basic command-line shell in C++, supporting command parsing, execution, and built-in commands like cd, exit, and pwd.Gained hands-on experience with process handling, system calls, and input parsing in a Unix-like environment.',
        technologies: ['C++'],
      },
      {
        name: 'Coding Club Website(In Development)',
        description: 'Coding club website helps to host coding contest and students can participate into that contest on college basis',
        technologies: ['{PosrgreSQL', 'SQLite', 'React', 'JWT'],
      },
      {
        name: 'Book Rental Website(In Development)',
        description: 'Interactive platform for Rent Books and Return Back as you Want',
        technologies: ['Firebase', 'React', 'Authentication'],
      },
    ],
  };

  const handleDownloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <StyledContainer maxWidth="lg" id="resume">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Resume
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadResume}
              sx={{
                borderRadius: '12px',
                padding: '12px 24px',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              Download CV
            </Button>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ mr: 1 }} /> Education
                  </Typography>
                  {resumeData.education.map((edu, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6">{edu.degree}</Typography>
                      <Typography variant="subtitle1" color="primary">
                        {edu.institution}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {edu.year}
                      </Typography>
                      <List dense>
                        {edu.details.map((detail, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={detail} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon sx={{ mr: 1 }} /> Experience
                  </Typography>
                  {resumeData.experience.map((exp, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6">{exp.role}</Typography>
                      <Typography variant="subtitle1" color="secondary">
                        {exp.company}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {exp.year}
                      </Typography>
                      <List dense>
                        {exp.details.map((detail, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckCircleIcon color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={detail} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CodeIcon sx={{ mr: 1 }} /> Skills & Technologies
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="secondary" gutterBottom>
                      Technical Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {resumeData.skills.technical.map((skill, index) => (
                        <SkillChip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="secondary" gutterBottom>
                      Soft Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {resumeData.skills.soft.map((skill, index) => (
                        <SkillChip
                          key={index}
                          label={skill}
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="secondary" gutterBottom>
                      Operating Systems
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {resumeData.skills.Os.map((skill, index) => (
                        <SkillChip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Projects
                  </Typography>
                  <Grid container spacing={3}>
                    {resumeData.projects.map((project, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ height: '100%', background: theme.palette.background.paper + '40' }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {project.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                              {project.description}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {project.technologies.map((tech, idx) => (
                                <Chip
                                  key={idx}
                                  label={tech}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                />
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </StyledCard>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </StyledContainer>
  );
};

export default Resume;
