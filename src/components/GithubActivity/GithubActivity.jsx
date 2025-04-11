import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}30`,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StatsFrame = styled('iframe')({
  width: '100%',
  height: '195px',
  border: 'none',
  overflow: 'hidden',
  marginBottom: '16px',
});

const ActivityFrame = styled('iframe')({
  width: '100%',
  height: '400px',
  border: 'none',
  overflow: 'hidden',
});

const GithubActivity = () => {
  const theme = useTheme();
  const username = 'Girish-1-Goyal';

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
          GitHub Activity
        </Typography>

        <StatsContainer>
          <Grid container spacing={4}>
            {/* GitHub Stats */}
            <Grid item xs={12} md={6}>
              <GlassCard>
                <Typography variant="h5" gutterBottom color="primary">
                  GitHub Stats
                </Typography>
                <StatsFrame
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&count_private=true&theme=transparent&title_color=${theme.palette.primary.main.slice(1)}&text_color=${theme.palette.text.primary.slice(1)}&icon_color=${theme.palette.secondary.main.slice(1)}`}
                />
              </GlassCard>
            </Grid>

            {/* Most Used Languages */}
            <Grid item xs={12} md={6}>
              <GlassCard>
                <Typography variant="h5" gutterBottom color="primary">
                  Most Used Languages
                </Typography>
                <StatsFrame
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&theme=transparent&title_color=${theme.palette.primary.main.slice(1)}&text_color=${theme.palette.text.primary.slice(1)}`}
                />
              </GlassCard>
            </Grid>

            {/* Contribution Graph */}
            <Grid item xs={12}>
              <GlassCard>
                <Typography variant="h5" gutterBottom color="primary">
                  Contribution Graph
                </Typography>
                <ActivityFrame
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=transparent&color=${theme.palette.text.primary.slice(1)}&line=${theme.palette.primary.main.slice(1)}&point=${theme.palette.secondary.main.slice(1)}&area_color=${theme.palette.primary.main.slice(1)}&area=true&hide_border=true&custom_title=`}
                />
              </GlassCard>
            </Grid>

            {/* Contribution Calendar */}
            <Grid item xs={12}>
              <GlassCard>
                <Typography variant="h5" gutterBottom color="primary">
                  Contribution Calendar
                </Typography>
                <img
                  src={`https://ghchart.rshah.org/${theme.palette.primary.main.slice(1)}/${username}`}
                  alt="GitHub Contribution Calendar"
                  style={{ width: '100%', height: 'auto' }}
                />
              </GlassCard>
            </Grid>
          </Grid>
        </StatsContainer>
      </motion.div>
    </StyledContainer>
  );
};

export default GithubActivity;
