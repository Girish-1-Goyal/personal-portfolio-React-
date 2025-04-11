import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

const InfoBox = styled(Box)(({ theme }) => ({
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

const MapContainer = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '400px',
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  zIndex: 2,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.23)'
        : 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSnackbar({
      open: true,
      message: 'Message sent successfully!',
      severity: 'success',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
    <StyledContainer maxWidth="lg" id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Contact Me
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <GlassCard>
                <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                  <InfoBox>
                    <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography>girishgoyal15144214@gmail.com</Typography>
                  </InfoBox>
                  <InfoBox>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography>+91 8006591948</Typography>
                  </InfoBox>
                  <InfoBox>
                    <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography>Bulandshahr, India</Typography>
                  </InfoBox>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom color="primary">
                      Send a Message
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <StyledTextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <StyledTextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <StyledTextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          mt: 2,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          color: theme.palette.common.white,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </form>
                  </Box>
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <GlassCard>
                <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                  <MapContainer
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56334.80263522914!2d77.81731397910157!3d28.406995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c7b3f9981e7df%3A0x4d57a875c44cc1bb!2sBulandshahr%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1706457343899!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bulandshahr Map"
                  />
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </StyledContainer>
  );
};

export default Contact;
