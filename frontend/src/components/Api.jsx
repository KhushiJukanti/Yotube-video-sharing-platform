import axios from 'axios';

const BASE_URL = 'http://localhost:7000'; // Replace with your backend URL

// Function to get all videos
export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`);
    return response.data; // Assuming response data is the array of videos
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; // Propagate error
  }
};

// Function to get a video by ID
export const getVideoById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos/${id}`);
    return response.data; // Assuming response data is the video object
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error; // Propagate error
  }
};

// Function to like a video and return updated likes count
export const likeVideo = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos/${id}/like`);
    return response.data.likes; // Assuming the backend returns updated likes count
  } catch (error) {
    console.error("Error liking video:", error);
    throw error;
  }
};

// Function to dislike a video and return updated dislikes count
export const dislikeVideo = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos/${id}/dislike`);
    return response.data.dislikes; // Assuming the backend returns updated dislikes count
  } catch (error) {
    console.error("Error disliking video:", error);
    throw error;
  }
};


// Function to get comments for a video
export const getComments = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${videoId}`);
    return response.data; // Assuming response data is the array of comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Propagate error
  }
};

// Function to add a comment to a video
export const addComment = async (videoId, commentText) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments/${videoId}`, { text: commentText });
    return response.data; // Return updated comments list
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
    alert('Failed to add comment. Please try again later.');
    throw error;
  }
};
