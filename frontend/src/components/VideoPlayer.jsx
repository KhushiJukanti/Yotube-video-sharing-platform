import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById, likeVideo, dislikeVideo, getComments, addComment } from './Api'; // Adjust the path according to your structure
import {io} from 'socket.io-client';

const VideoPlayer = () => {
  const { id } = useParams(); // Get the video ID from the URL parameters
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoData = await getVideoById(id); // Fetch video data by ID
        const commentData = await getComments(id);
        setVideo(videoData);
        setComments(commentData)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    // Initialize Socket.IO
    const socket = io('http://localhost:7000'); // Adjust the URL as necessary
    setSocket(socket);

    // Listen for new comments from the server
    socket.on('new_comment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };

  }, [id]);

  // Handle like button click
  const handleLike = async () => {
    try {
      const updatedLikes = await likeVideo(id); // Call API to like the video
      setVideo(prevVideo => ({
        ...prevVideo,
        likes: updatedLikes, // Update the likes count in state
      }));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Handle dislike button click
  const handleDislike = async () => {
    try {
      const updatedDislikes = await dislikeVideo(id); // Call API to dislike the video
      setVideo(prevVideo => ({
        ...prevVideo,
        dislikes: updatedDislikes, // Update the dislikes count in state
      }));
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };


  // Handle posting a comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const updatedComments = await addComment(id, newComment); // Add the comment using the backend
      // setComments(...comments, updatedComments); // Update comments list
      socket.emit('add_comment', updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };



  if (loading) {
    return <div className="text-white">Loading video...</div>;
  }

  if (error) {
    return <div className="text-danger">Error fetching video: {error.message}</div>;
  }

  return (
    <div className="container mt-5 text-white">
      {/* Video Title */}
      <h2 className="mb-4">{video.title}</h2>

      {/* Video Player */}
      <div className="embed-responsive embed-responsive-16by9 mb-4" style={{ maxWidth: '80%', height: '500px' }}>
        <video className="embed-responsive-item" style={{ width: '100%', height: '100%' }} controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Video Details */}
      <div className="mb-3">
        <h3>{video.description}</h3>
        <p>
          <small className="text-white">Uploaded on: {new Date(video.uploadDate).toLocaleDateString()}</small>
        </p>
      </div>

      {/* Likes and Dislikes */}
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-outline-light btn-sm me-3" onClick={handleLike}>
          👍 {video.likes}
        </button>
        <button className="btn btn-outline-light btn-sm" onClick={handleDislike}>
          👎 {video.dislikes}
        </button>
      </div>

      {/* Channel Name */}
      <p className="font-weight-bold">Channel: {video.channelName}</p>


      {/* Comment Section */}
      <div className="comments-section mt-4">
        <h5 className="mb-4">Comments</h5>
        <ul className="list-group mb-3">
          {comments.map((comment) => (
            <li className="list-group-item bg-dark text-white" key={comment._id}>
              {comment.text}
            </li>
          ))}
        </ul>

        {/* Add New Comment */}
        <form onSubmit={handlePostComment}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-light">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoPlayer;
