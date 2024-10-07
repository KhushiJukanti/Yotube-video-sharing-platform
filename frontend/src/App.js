import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import { getVideos } from './API-Services/Api';
// import './App.css';
import SideNavbar from './components/Sidebar/Sidebar';

function App() {
  const [videos, setVideos] = useState([]);

  // Fetch videos from the backend API
  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  const [sideNavbar, setSideNavbar] = useState(false);

  // Function to toggle the sidebar
  const toggleSideNavbar = () => {
    setSideNavbar(prevState => !prevState);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Router>
      <div className="app" style={{backgroundColor :'black', height:'100vh'}}>
        <Navbar setSideNavbarFunc={toggleSideNavbar} sideNavbar={sideNavbar} />

        <div className="d-flex">
          <SideNavbar sideNavbar={sideNavbar} />
          <div className="main-content flex-grow-1">
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
