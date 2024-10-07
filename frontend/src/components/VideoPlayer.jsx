import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById, likeVideo, dislikeVideo } from '../API-Services/Api';
import CommentSection from './CommentSection';
import '../App.css';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await getVideoById(id);
      setVideo(data);
      setLikes(data.likes);
      setDislikes(data.dislikes);
    };

    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    await likeVideo(id);
    setLikes(likes + 1);
  };

  const handleDislike = async () => {
    await dislikeVideo(id);
    setDislikes(dislikes + 1);
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-player">
      <div className="container mt-4">
        <div className="embed-responsive embed-responsive-16by9">
          <video controls className="embed-responsive-item">
            <source src={`http://localhost:5000/${video.filePath}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className="mt-3">{video.title}</h3>
        <hr />
        <p>Video description: {video.description}</p>
        <button onClick={handleLike}>👍 {likes}</button>
        <button onClick={handleDislike}>👎 {dislikes}</button>
        <CommentSection videoId={id} />
      </div>
    </div>
  );
}

export default VideoPlayer;
