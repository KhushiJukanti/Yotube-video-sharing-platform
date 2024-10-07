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

// Function to like a video
export const likeVideo = async (id) => {
  try {
    await axios.post(`${BASE_URL}/videos/${id}/like`);
  } catch (error) {
    console.error("Error liking video:", error);
    throw error; // Propagate error
  }
};

// Function to dislike a video
export const dislikeVideo = async (id) => {
  try {
    await axios.post(`${BASE_URL}/videos/${id}/dislike`);
  } catch (error) {
    console.error("Error disliking video:", error);
    throw error; // Propagate error
  }
};

// Function to get comments for a video
export const getComments = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${videoId}/:videioId`);
    return response.data; // Assuming response data is the array of comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Propagate error
  }
};

// Function to add a comment to a video
export const addComment = async (videoId, commentText) => {
  try {
    await axios.post(`${BASE_URL}/comments/${videoId}/:videoId`, { text: commentText });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Propagate error
  }
};
