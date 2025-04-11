const CODEFORCES_API_BASE = 'https://codeforces.com/api';

// Helper function to handle API calls with retries
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'OK') {
        return data;
      }
      if (data.comment && data.comment.includes('Call limit exceeded')) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      throw new Error(data.comment || 'Unknown error occurred');
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

export const fetchUserInfo = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.info?handles=${handle}`);
    
    if (data.status === 'OK' && data.result && data.result.length > 0) {
      const user = data.result[0];
      return {
        handle: user.handle,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        country: user.country || '',
        city: user.city || '',
        organization: user.organization || '',
        contribution: user.contribution || 0,
        rank: user.rank || '',
        rating: user.rating || 0,
        maxRank: user.maxRank || '',
        maxRating: user.maxRating || 0,
        lastOnlineTimeSeconds: user.lastOnlineTimeSeconds || 0,
        registrationTimeSeconds: user.registrationTimeSeconds || 0,
        friendOfCount: user.friendOfCount || 0,
        currentRating: user.rating || 0,
      };
    }
    throw new Error('User not found');
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Failed to fetch user information. Please try again later.');
  }
};

export const fetchUserRating = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.rating?handle=${handle}`);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching user rating:', error);
    throw new Error('Failed to fetch rating history. Please try again later.');
  }
};

export const fetchUserSubmissions = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.status?handle=${handle}&from=1&count=100`);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    throw new Error('Failed to fetch submissions. Please try again later.');
  }
};

export const fetchUserBlogEntries = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.blogEntries?handle=${handle}`);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching user blog entries:', error);
    throw new Error('Failed to fetch blog entries. Please try again later.');
  }
};

export const fetchUserContests = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.rating?handle=${handle}`);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching user contests:', error);
    throw new Error('Failed to fetch contests. Please try again later.');
  }
};

export const fetchUserFriends = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.friends?handle=${handle}`);
    return data.result || [];
  } catch (error) {
    console.error('Error fetching user friends:', error);
    throw new Error('Failed to fetch friends. Please try again later.');
  }
};

export const fetchUserPhoto = async (handle) => {
  try {
    const data = await fetchWithRetry(`${CODEFORCES_API_BASE}/user.info?handles=${handle}`);
    if (data.status === 'OK' && data.result && data.result.length > 0) {
      const user = data.result[0];
      return user.titlePhoto ? `https:${user.titlePhoto}` : null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return null;
  }
}; 