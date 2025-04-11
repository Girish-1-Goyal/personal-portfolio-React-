import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Import components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import CompetitiveProgramming from './components/CompetitiveProgramming/CompetitiveProgramming';
import Contact from './components/Contact/Contact';
import Resume from './components/Resume/Resume';
import GithubActivity from './components/GithubActivity/GithubActivity';
import Blog from './components/Blog/Blog';

// Create responsive theme
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ECDC4',
    },
    secondary: {
      main: '#FF6B6B',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

// Make theme responsive
theme = responsiveFontSizes(theme);

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)',
  overflowX: 'hidden',
}));

const ContentContainer = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContainer>
        <Navbar />
        <AnimatePresence mode="wait">
          <ContentContainer
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Home />
            <About />
            <Skills />
            <Projects />
            <CompetitiveProgramming />
            <GithubActivity />
            <Blog />
            <Resume />
            <Contact />
          </ContentContainer>
        </AnimatePresence>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
