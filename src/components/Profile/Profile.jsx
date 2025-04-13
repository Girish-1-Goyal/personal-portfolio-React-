import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  Avatar,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Code as CodeIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

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

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: 400,
  height: 400,
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[10],
  objectFit: 'cover',
  objectPosition: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 280,
    height: 280,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.02)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(10px)',
  },
}));

const Profile = () => {
  const theme = useTheme();

  const skills = [
    'React.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'MongoDB',
    'SQL',
    'Git',
    'Docker',
    'AWS',
    'Material-UI',
    'C++',
    'NoSQL'
  ];

  const personalInfo = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'girishgoyal15144214@gmail.com',
    },
    {
      icon: <PhoneIcon />,
      label: 'Phone',
      value: '+91 8006591948',
    },
    {
      icon: <LocationIcon />,
      label: 'Location',
      value: 'Bulandshahr, India',
    },
    {
      icon: <SchoolIcon />,
      label: 'Education',
      value: 'B.Tech Computer Science (2018-2022)',
    },
    {
      icon: <CodeIcon />,
      label: 'Codeforces Rating',
      value: '1867(Expert)',
    },
  ];

  return (
    <StyledContainer maxWidth="lg" id="profile">
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
          Profile
        </Typography>

        <Box sx={{ mb: 8, position: 'relative' }}>
          <Box sx={{ 
            position: 'relative',
            width: 'fit-content',
            margin: '0 auto',
            maxWidth: '100%',
            overflow: 'hidden',
            px: { xs: 2, sm: 0 },
          }}>
            <LargeAvatar
              src="/profile.jpg"
              alt="Girish Kumar Goyal"
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              imgProps={{
                style: {
                  objectFit: 'cover',
                  objectPosition: 'center 1%',
                }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '300px', sm: '420px' },
                height: { xs: '300px', sm: '420px' },
                borderRadius: '50%',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                filter: 'blur(20px)',
                zIndex: -1,
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Personal Information
                </Typography>
                {personalInfo.map((info, index) => (
                  <InfoItem key={index}>
                    <Box
                      sx={{
                        mr: 2,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        {info.label}
                      </Typography>
                      <Typography variant="body1">
                        {info.value}
                      </Typography>
                    </Box>
                  </InfoItem>
                ))}
              </CardContent>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassCard>
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Technical Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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

                <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
                  Professional Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  Passionate Full Stack Developer with expertise in modern web technologies and a strong foundation in computer science. Graduated from B.Tech in Computer Science with a focus on building scalable web applications and solving complex algorithmic problems.
                </Typography>
                <Typography variant="body1">
                  Active competitive programmer with a strong presence on platforms like CodeChef. Experienced in developing full-stack applications using React.js, Node.js, and various modern frameworks and tools.
                </Typography>
              </CardContent>
            </GlassCard>
          </Grid>
        </Grid>
      </motion.div>
    </StyledContainer>
  );
};

export default Profile;
