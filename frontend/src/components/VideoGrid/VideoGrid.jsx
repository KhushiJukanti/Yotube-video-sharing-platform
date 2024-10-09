import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './VideoGrid.css'; // Custom CSS for extra styles

const VideoGrid = ({ videos, isSidebarOpen }) => {
  return (
    <div className={`container mt-4 ${isSidebarOpen ? 'ml-5' : ''}`}>
      <div className="row mt-5">
        {videos.map(video => (
          <div key={video.id} className="col-md-4 mb-3">
            {/* Wrap the card inside Link to navigate on click */}
            <Link to={`/video/${video._id}`} className="text-decoration-none">
              <div className="card custom-card">
                <img src={video.thumbnail} alt={video.title} className="card-img-top custom-img" />
                <div className="card-body bg-black text-white mb-0">
                  <h5 className="card-title">{video.title}</h5>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text text-sm mb-0">
                      <small>{new Date(video.uploadDate).toLocaleDateString()}</small>
                    </p>
                    <p className="card-text text-sm mb-0">
                      <small>{video.views}</small> views
                    </p>
                    <p className="card-text text-sm mb-0">
                      <small>{video.channelName}</small>
                    </p>
                  </div>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
