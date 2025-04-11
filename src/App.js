import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/ThemeConfig';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import Resume from './components/Resume/Resume';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import CompetitiveProgramming from './components/CompetitiveProgramming/CompetitiveProgramming';
import GithubActivity from './components/GithubActivity/GithubActivity';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of your navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'profile',
        'resume',
        'skills',
        'projects',
        'competitive',
        'github',
        'contact'
      ];

      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <Box
                  sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    background: theme.palette.background.default,
                    backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1))',
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px',
                    overflowX: 'hidden',
                  }}
                >
                  <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
                  <Container 
                    maxWidth={false}
                    sx={{
                      pt: '64px',
                      px: { xs: 2, sm: 3, md: 4 },
                      mx: 'auto',
                      maxWidth: '1920px',
                      flexGrow: 1,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <section id="home">
                          <Home />
                        </section>
                        <section id="about">
                          <About />
                        </section>
                        <section id="profile">
                          <Profile />
                        </section>
                        <section id="resume">
                          <Resume />
                        </section>
                        <section id="skills">
                          <Skills />
                        </section>
                        <section id="projects">
                          <Projects />
                        </section>
                        <section id="competitive">
                          <CompetitiveProgramming />
                        </section>
                        <section id="github">
                          <GithubActivity />
                        </section>
                        <section id="contact">
                          <Contact />
                        </section>
                      </motion.div>
                    </AnimatePresence>
                  </Container>
                  <Footer />
                </Box>
              }
            />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
