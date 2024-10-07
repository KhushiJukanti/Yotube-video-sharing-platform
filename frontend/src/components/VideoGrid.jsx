import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVideos } from '../API-Services/Api';
import '../App.css';

function VideoGrid() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {videos.map((video) => (
          <div className="col-md-3" key={video._id}>
            <div className="card mb-3">
              <Link to={`/video/${video._id}`}>
                <img src={`http://localhost:5000/${video.filePath}`} className="card-img-top" alt={video.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">{video.channel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGrid;
