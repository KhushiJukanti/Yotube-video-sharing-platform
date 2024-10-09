import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios';

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();

  const handleClickModal = () => {
    setNavbarModal(prev => !prev);
  };

  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  const onclickOfPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    }
  };

  const getLogoutFun = async () => {
    axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Logout");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLogedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);

  return (
    <div className='navbar fixed-top bg-dark mb-3'>
      <div className="navbar-left d-flex mb-2 align-items-center">
        <div className="navbarHamberger" onClick={setSideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>

        <Link to={'/'} className="navbar_youtubeImg mt-1 d-flex align-items-center text-white text-decoration-none">
          <YouTubeIcon sx={{ fontSize: "34px" }} className='navbar_youtubeImage' />
          <div className='navbar_utubeTitle'>YouTube</div>
        </Link>
      </div>

      <div className="navbar-middle mb-3 d-flex align-items-center">
        <div className="navbar_search d-flex">
          <input className="form-control" type="text" placeholder="Search" />
          <SearchIcon sx={{ color: "white", cursor: "pointer" }} />
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className="navbar-right mb-2 d-flex align-items-center">
        <Link to={'/763/upload'}>
          <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
        </Link>
        <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />

        <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='Profile' />

        {navbarModal && (
          <div className='navbar-modal'>
            {isLogedIn ? (
              <>
                <div className="navbar-modal-option" onClick={handleprofile}>
                  <PersonIcon sx={{ fontSize: "30px" }} /> My Profile
                </div>
                <div className="navbar-modal-option" onClick={() => onclickOfPopUpOption("logout")}>
                  Logout
                </div>
              </>
            ) : (
              <div className="navbar-modal-option" onClick={() => onclickOfPopUpOption("login")}>
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;
