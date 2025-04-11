import React, { useState, useEffect, useRef } from 'react';
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
  Divider,
  LinearProgress,
  Button,
} from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
import { RatingGraph, ProblemSolving3D } from './CompetitiveVisuals';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import { 
  fetchUserInfo, 
  fetchUserRating, 
  fetchUserSubmissions,
  fetchUserBlogEntries,
  fetchUserContests,
  fetchUserFriends,
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
  const [blogEntries, setBlogEntries] = useState([]);
  const [contests, setContests] = useState([]);
  const [stats, setStats] = useState({
    solvedByDifficulty: {},
    solvedByTag: {},
    contestPerformance: {},
  });
  const pollingInterval = useRef(null);

  const getDifficultyColor = (difficulty) => {
    if (!difficulty || difficulty === 'Unknown') return theme.palette.grey[500];
    const rating = parseInt(difficulty);
    if (rating < 1200) return '#808080'; // Grey
    if (rating < 1400) return '#008000'; // Green
    if (rating < 1600) return '#03A89E'; // Cyan
    if (rating < 1900) return '#0000FF'; // Blue
    if (rating < 2100) return '#AA00AA'; // Violet
    if (rating < 2300) return '#FF8C00'; // Orange
    if (rating < 2400) return '#FF8C00'; // Orange
    if (rating < 2600) return '#FF0000'; // Red
    if (rating < 3000) return '#FF0000'; // Red
    return '#FF0000'; // Red
  };

  const getRankColor = (rank) => {
    if (!rank) return theme.palette.grey[500];
    const rankStr = String(rank).toLowerCase();
    if (rankStr.includes('legendary')) return '#FF0000'; // Red
    if (rankStr.includes('international')) return '#FF0000'; // Red
    if (rankStr.includes('grandmaster')) return '#FF0000'; // Red
    if (rankStr.includes('master')) return '#FF8C00'; // Orange
    if (rankStr.includes('candidate')) return '#AA00AA'; // Violet
    if (rankStr.includes('expert')) return '#0000FF'; // Blue
    if (rankStr.includes('specialist')) return '#03A89E'; // Cyan
    if (rankStr.includes('pupil')) return '#008000'; // Green
    return '#808080'; // Grey
  };

    const fetchData = async () => {
      try {
        setLoading(true);
      setError(null);
        const handle = 'Girish_k_Goyal';
        
      // Fetch basic user info and photo first
      const [userInfo, photoUrl] = await Promise.all([
        fetchUserInfo(handle),
        fetchUserPhoto(handle)
      ]);
      
      setProfilePhoto(photoUrl);
        
        // Then fetch other data in parallel
        const [ratingData, submissions, blogs, contestData] = await Promise.all([
          fetchUserRating(handle),
          fetchUserSubmissions(handle),
          fetchUserBlogEntries(handle),
          fetchUserContests(handle)
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
        contestData.forEach(contest => {
          const contestName = contest.contestName;
          const performance = contest.newRating - contest.oldRating;
        contestPerformance[contestName] = {
          performance,
          rank: contest.rank,
          color: getRankColor(contest.rank)
        };
        });

        setProfileData({
          name: userInfo.firstName + ' ' + userInfo.lastName,
          handle: userInfo.handle,
          currentRating: userInfo.rating,
          maxRating: userInfo.maxRating,
          rank: userInfo.rank,
          maxRank: userInfo.maxRank,
          country: userInfo.country,
          organization: userInfo.organization,
          contribution: userInfo.contribution,
        });

        setRatingHistory(ratingData.map(rating => ({
          date: new Date(rating.ratingUpdateTimeSeconds * 1000),
        rating: rating.newRating,
        rank: rating.rank,
        color: getRankColor(rating.rank)
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
        difficultyColor: getDifficultyColor(sub.problem.rating)
        })));

        setBlogEntries(blogs);
        setContests(contestData);
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
    };

  useEffect(() => {
    fetchData();

    // Set up polling for updates every 2 minutes (reduced from 1 minute to avoid rate limits)
    pollingInterval.current = setInterval(fetchData, 2 * 60 * 1000);

    // Cleanup interval on unmount
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

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
              p: 3,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
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
                    width: 120,
                    height: 120,
                    border: `3px solid ${getRankColor(profileData?.rank)}`,
                    boxShadow: `0 0 20px ${getRankColor(profileData?.rank)}40`,
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {!profilePhoto && 'GK'}
                </Avatar>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
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
                <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
                  GL Bajaj Institute of Technology and Management
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {profileData?.currentRating || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Current Rating
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {profileData?.maxRating || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Max Rating
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {profileData?.contribution || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Contribution
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        background: theme.palette.action.hover,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {profileData?.friendOfCount || 0}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28,
                          bgcolor: submission.difficultyColor,
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography 
                          variant="subtitle2" 
                          noWrap
                          sx={{ 
                            color: submission.difficultyColor,
                            fontWeight: 'bold'
                          }}
                        >
                          {submission.problem}
                        </Typography>
                        <Stack 
                          direction="row" 
                          spacing={0.5} 
                          sx={{ mt: 0.5 }}
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
                          {submission.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              size="small"
                              label={tag}
                              sx={{ 
                                height: 16,
                                '& .MuiChip-label': { px: 1, fontSize: '0.65rem' }
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      {submission.status === 'OK' && (
                      <Button
                        size="small"
                          component="a"
                          href={`https://codeforces.com/contest/${submission.contestId}/submission/${submission.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        startIcon={<CodeIcon />}
                      >
                        View Solution
                      </Button>
                      )}
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
    </Container>
  );
};

export default CompetitiveProgramming;
