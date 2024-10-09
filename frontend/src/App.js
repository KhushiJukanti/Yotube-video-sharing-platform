import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import VideoGrid from './components/VideoGrid/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { getVideos } from './components/Api';
import SideNavbar from './components/Sidebar/Sidebar';
import './App.css'; // Add this line for external CSS

function App() {
  const [videos, setVideos] = useState([]);
  const [sideNavbar, setSideNavbar] = useState(false);

  // Fetch videos from the backend API
  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  // Function to toggle the sidebar
  const toggleSideNavbar = () => {
    setSideNavbar(prevState => !prevState);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Router>
      <div className={`app ${sideNavbar ? 'sidebar-open' : ''}`} style={{ backgroundColor: 'black' }}>
        <Navbar setSideNavbarFunc={toggleSideNavbar} sideNavbar={sideNavbar} />

        <div className="d-flex">
          {/* Sidebar */}
          <SideNavbar sideNavbar={sideNavbar} />

          {/* Main Content */}
          <div className="main-content flex-grow-1 mt-4">
            <Routes>
              <Route path="/" element={<VideoGrid videos={videos} />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
