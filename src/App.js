import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Resume from './components/Resume/Resume';
import CompetitiveProgramming from './components/CompetitiveProgramming/CompetitiveProgramming';
import Terminal from './components/Terminal/Terminal';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { darkTheme } from './theme';

function App() {
  const theme = createTheme(darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/competitive" element={<CompetitiveProgramming />} />
            <Route path="/terminal" element={<Terminal />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
