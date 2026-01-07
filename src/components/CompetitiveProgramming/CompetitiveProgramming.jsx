import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  useTheme,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
} from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';
import { RatingGraph } from './CompetitiveVisuals';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { 
  fetchUserInfo, 
  fetchUserRating, 
  fetchUserSubmissions,
  fetchUserPhoto
} from '../../services/codeforcesService';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const CompetitiveProgramming = () => {
  const theme = useTheme();
  const [showAllSubmissions, setShowAllSubmissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [stats, setStats] = useState({
    solvedByDifficulty: {},
    solvedByTag: {},
    contestPerformance: {},
  });

  const getDifficultyColor = useCallback((difficulty) => {
    if (difficulty <= 1200) return '#43A047';
    if (difficulty <= 1400) return '#7CB342';
    if (difficulty <= 1600) return '#C0CA33';
    if (difficulty <= 1900) return '#0202ba';
    if (difficulty <= 2100) return '#FB8C00';
    if (difficulty <= 2400) return '#F4511E';
    return '#C62828';
  }, []);

  const getRankColor = useCallback((rank) => {
    if (!rank || typeof rank !== 'string') return '#999999';
    const rankLower = rank.toLowerCase();
    if (rankLower.includes('newbie')) return '#999999';
    if (rankLower.includes('pupil')) return '#43A047';
    if (rankLower.includes('specialist')) return '#2196F3';
    if (rankLower.includes('expert')) return '#0202ba';
    if (rankLower.includes('candidate master')) return '#E91E63';
    if (rankLower.includes('master')) return '#FF9800';
    if (rankLower.includes('grandmaster')) return '#F44336';
    return '#999999';
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const handle = 'epsilon_xd';
      
      // Fetch basic user info and photo first
      const [userInfo, photoUrl] = await Promise.all([
        fetchUserInfo(handle),
        fetchUserPhoto(handle)
      ]);
      
      setProfilePhoto(photoUrl);
      
      // Then fetch other data in parallel
      const [ratingData, submissions] = await Promise.all([
        fetchUserRating(handle),
        fetchUserSubmissions(handle)
      ]);

      // Process submissions for statistics
      const solvedByDifficulty = {};
      const solvedByTag = {};
      const solvedProblems = new Set();

      submissions.forEach(sub => {
        if (sub.verdict === 'OK' && !solvedProblems.has(sub.problem.name)) {
          solvedProblems.add(sub.problem.name);
          
          // Count by difficulty
          const rating = sub.problem.rating || 0;
          const difficulty = Math.floor(rating / 100) * 100;
          solvedByDifficulty[difficulty] = (solvedByDifficulty[difficulty] || 0) + 1;

          // Count by tags
          sub.problem.tags?.forEach(tag => {
            solvedByTag[tag] = (solvedByTag[tag] || 0) + 1;
          });
        }
      });

      // Process contest performance with rank colors
      const contestPerformance = {};
      ratingData.forEach(contest => {
        const contestName = contest.contestName;
        const performance = contest.newRating - contest.oldRating;
        const rankStr = String(contest.rank || '');
        contestPerformance[contestName] = {
          performance,
          rank: rankStr,
          color: getRankColor(rankStr)
        };
      });

      setProfileData({
        name: userInfo.firstName + ' ' + userInfo.lastName,
        handle: userInfo.handle,
        currentRating: userInfo.rating,
        maxRating: userInfo.maxRating,
        rank: String(userInfo.rank || ''),
        maxRank: String(userInfo.maxRank || ''),
        country: userInfo.country,
        organization: userInfo.organization,
        contribution: userInfo.contribution,
      });

      setRatingHistory(ratingData.map(rating => ({
        date: new Date(rating.ratingUpdateTimeSeconds * 1000),
        rating: rating.newRating,
        rank: String(rating.rank || ''),
        color: getRankColor(String(rating.rank || ''))
      })));

      setRecentSubmissions(submissions.map(sub => ({
        id: sub.id,
        problem: sub.problem.name,
        platform: 'Codeforces',
        status: sub.verdict,
        date: new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0],
        difficulty: sub.problem.rating ? `${sub.problem.rating}` : 'Unknown',
        tags: sub.problem.tags || [],
        contestId: sub.contestId,
        problemIndex: sub.problem.index,
        difficultyColor: getDifficultyColor(sub.problem.rating)
      })));

      setStats({
        solvedByDifficulty,
        solvedByTag,
        contestPerformance,
        totalSolved: solvedProblems.size
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Codeforces data:', error);
      setError(error.message || 'Failed to fetch data from Codeforces. Please try again later.');
      setLoading(false);
    }
  }, [getDifficultyColor, getRankColor]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && !profileData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            {error}
        </Typography>
          <Button 
            variant="contained" 
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchData();
            }}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  const displayedSubmissions = showAllSubmissions ? recentSubmissions : recentSubmissions.slice(0, 5);

  // Prepare data for difficulty distribution chart
  const difficultyData = {
    labels: Object.keys(stats.solvedByDifficulty).map(d => `${d}-${parseInt(d) + 99}`),
    datasets: [{
      label: 'Problems Solved',
      data: Object.values(stats.solvedByDifficulty),
      backgroundColor: [
        theme.palette.success.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.error.main,
      ],
      borderColor: theme.palette.background.paper,
      borderWidth: 2,
    }]
  };

  // Prepare data for tag distribution chart
  const tagData = {
    labels: Object.keys(stats.solvedByTag).slice(0, 10),
    datasets: [{
      label: 'Problems by Tag',
      data: Object.values(stats.solvedByTag).slice(0, 10),
      backgroundColor: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEEAD', '#D4A5A5', '#A8D8EA', '#AA96DA',
        '#FCBAD3', '#FFFFD2'
      ],
      borderColor: theme.palette.background.paper,
      borderWidth: 2,
    }]
  };

  // Prepare data for contest performance chart
  const contestData = {
    labels: Object.keys(stats.contestPerformance).slice(-10).map(contest => {
      // Extract contest name or use a shortened version
      const name = contest.split(' ')[0];
      return name.length > 10 ? name.substring(0, 10) + '...' : name;
    }),
    datasets: [{
      label: 'Rating Change',
      data: Object.values(stats.contestPerformance).slice(-10).map(contest => contest.performance),
      backgroundColor: Object.values(stats.contestPerformance).slice(-10).map(contest => contest.color),
      borderColor: theme.palette.background.paper,
      borderWidth: 2,
    }]
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" 
        sx={{ fontWeight: 'bold', mb: 4 }}>
        Competitive Programming Journey
      </Typography>

      <Grid container spacing={3}>
        {/* Profile and Stats */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: { xs: 2, sm: 3 }
            }}>
              <Box 
                component="a"
                href="https://codeforces.com/profile/Girish-1-Goyal"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',
                  }
                }}
              >
                <Avatar
                  src={profilePhoto}
                  alt="Profile"
                  sx={{
                    width: { xs: 100, sm: 120 },
                    height: { xs: 100, sm: 120 },
                    border: `3px solid ${getRankColor(profileData?.rank)}`,
                    boxShadow: `0 0 20px ${getRankColor(profileData?.rank)}40`,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    fontWeight: 'bold',
                  }}
                >
                  {!profilePhoto && 'GK'}
                </Avatar>
              </Box>
              <Box sx={{ 
                flex: 1,
                width: '100%',
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'center' },
                  gap: { xs: 1, sm: 2 },
                  mb: 1 
                }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', sm: '2rem' }
                    }}
                  >
                    {profileData?.handle}
                  </Typography>
                  {profileData?.rank && (
                    <Chip
                      label={profileData.rank}
                      sx={{
                        bgcolor: getRankColor(profileData.rank),
                        color: 'white',
                        fontWeight: 'bold',
                        height: 28,
                        '& .MuiChip-label': {
                          px: 2,
                        },
                      }}
                    />
                  )}
                </Box>
                <Typography 
                  variant="subtitle1" 
                  color="textSecondary" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    px: { xs: 2, sm: 0 }
                  }}
                >
                  GL Bajaj Institute of Technology and Management
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {profileData?.currentRating || 0}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary"
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        Current Rating
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {profileData?.maxRating || 0}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary"
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        Max Rating
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {profileData?.contribution || 0}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary"
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        Contribution
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {profileData?.friendOfCount || 0}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary"
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        Friends
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Rating History */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Codeforces Rating History
            </Typography>
            <RatingGraph ratingHistory={ratingHistory} />
          </Paper>
        </Grid>

        {/* Problem Solving Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Problems by Difficulty
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Doughnut 
                data={difficultyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: theme.palette.text.primary,
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Tag Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Top Problem Tags
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Bar 
                data={tagData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: theme.palette.text.primary,
                      },
                      grid: {
                        color: theme.palette.divider,
                      },
                    },
                    x: {
                      ticks: {
                        color: theme.palette.text.primary,
                      },
                      grid: {
                        color: theme.palette.divider,
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Submissions */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recent Submissions
              </Typography>
              <Tooltip title={showAllSubmissions ? "Show less" : "Show more"}>
                <IconButton 
                  onClick={() => setShowAllSubmissions(!showAllSubmissions)}
                  sx={{ 
                    transform: showAllSubmissions ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Stack spacing={1}>
              {displayedSubmissions.map((submission) => (
                <Card 
                  key={submission.id}
                  variant="outlined"
                  sx={{ 
                    borderColor: 'transparent',
                    background: theme.palette.action.hover,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                    }
                  }}
                >
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 1 },
                    }}>
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flex: 1,
                        width: '100%',
                        minWidth: 0
                      }}>
                        <Avatar 
                          sx={{ 
                            width: 28, 
                            height: 28,
                            bgcolor: submission.difficultyColor,
                            flexShrink: 0
                          }}
                        >
                          <CheckCircleIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        <Box sx={{ 
                          flex: 1,
                          minWidth: 0
                        }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              color: submission.difficultyColor,
                              fontWeight: 'bold',
                              wordBreak: 'break-word',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: { xs: 1, sm: 2 },
                              WebkitBoxOrient: 'vertical',
                              lineHeight: '1.2em',
                              maxHeight: { xs: '1.2em', sm: '2.4em' }
                            }}
                          >
                            {submission.problem}
                          </Typography>
                          <Stack 
                            direction="row" 
                            spacing={0.5} 
                            sx={{ 
                              mt: 0.5,
                              flexWrap: 'wrap',
                              gap: 0.5
                            }}
                          >
                            <Chip
                              size="small"
                              icon={<CodeIcon sx={{ fontSize: '0.7rem' }} />}
                              label={submission.platform}
                              sx={{ 
                                height: 16,
                                '& .MuiChip-label': { px: 1, fontSize: '0.65rem' }
                              }}
                            />
                            <Chip
                              size="small"
                              icon={<AccessTimeIcon sx={{ fontSize: '0.7rem' }} />}
                              label={submission.date}
                              sx={{ 
                                height: 16,
                                '& .MuiChip-label': { px: 1, fontSize: '0.65rem' }
                              }}
                            />
                          </Stack>
                        </Box>
                      </Box>
                      <Stack
                        direction={{ xs: 'row', sm: 'row' }}
                        spacing={1}
                        sx={{
                          width: { xs: '100%', sm: 'auto' },
                          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                          mt: { xs: 1, sm: 0 }
                        }}
                      >
                        <Button
                          size="small"
                          component="a"
                          href={`https://codeforces.com/contest/${submission.contestId}/problem/${submission.problemIndex}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          sx={{
                            minWidth: { xs: '45%', sm: 'auto' },
                            flex: { xs: 1, sm: 'none' },
                            px: { xs: 1, sm: 2 },
                            py: 0.5,
                            fontSize: '0.75rem',
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.primary,
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              bgcolor: 'transparent'
                            }
                          }}
                        >
                          View Problem
                        </Button>
                        {submission.status === 'OK' && (
                          <Button
                            size="small"
                            component="a"
                            href={`https://codeforces.com/contest/${submission.contestId}/submission/${submission.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            sx={{
                              minWidth: { xs: '45%', sm: 'auto' },
                              flex: { xs: 1, sm: 'none' },
                              px: { xs: 1, sm: 2 },
                              py: 0.5,
                              fontSize: '0.75rem',
                              borderColor: theme.palette.divider,
                              color: theme.palette.text.primary,
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                bgcolor: 'transparent'
                              }
                            }}
                          >
                            View Solution
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Contest Performance */}
        <Grid item xs={12}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Recent Contest Performance
            </Typography>
            <Box sx={{ height: 300, position: 'relative' }}>
              <Bar 
                data={contestData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Rating Change: ${context.raw > 0 ? '+' : ''}${context.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        color: theme.palette.text.primary,
                      },
                      grid: {
                        color: theme.palette.divider,
                      },
                    },
                    x: {
                      ticks: {
                        color: theme.palette.text.primary,
                        maxRotation: 45,
                        minRotation: 45,
                      },
                      grid: {
                        color: theme.palette.divider,
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Buttons */}
      
    </Container>
  );
};

export default CompetitiveProgramming;
