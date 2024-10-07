import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import RecentActorsIcon from '@mui/icons-material/RecentActors'; // Newly added
import HistoryIcon from '@mui/icons-material/History'; // Newly added
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'; // Newly added

const SideNavbar = ({ sideNavbar }) => {
    return (
        <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                <div className="home_sideNavbarTopOption">
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle">Home</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <VideocamIcon />
                    <div className="home_sideNavbarTopOptionTitle">Shorts</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>

                {/* Added History Option */}
                <div className="home_sideNavbarTopOption">
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div>

                {/* Added Liked Videos Option */}
                <div className="home_sideNavbarTopOption">
                    <ThumbUpAltOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ChevronRightIcon />
                </div>

                <div className="home_sideNavbarTopOption">
                    <PlaylistAddIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlist</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <SmartDisplayOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <WatchLaterOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch Later</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <ContentCutIcon />
                    <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
                </div>

                {/* Added Actors Option */}
                <div className="home_sideNavbarTopOption">
                    <RecentActorsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Actors</div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscriptions</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img
                        className="home_sideNavbar_ImgLogo"
                        src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg"
                        alt="Aaj Tak logo"
                    />
                    <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img
                        className="home_sideNavbar_ImgLogo"
                        src="https://th.bing.com/th/id/R.bce6ed4af85677ce3b6908ac7e8e631b?rik=DFwXRhY0pZxYIg&pid=ImgRaw&r=0"
                        alt="The LallanTop logo"
                    />
                    <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
                </div>

                <div className="home_sideNavbarTopOption mb-5">
                    <img
                        className="home_sideNavbar_ImgLogo"
                        src="https://th.bing.com/th/id/OIP.Ptvb889e_arCEj1IgCROgAHaHa?rs=1&pid=ImgDetMain"
                        alt="NDTV India logo"
                    />
                    <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
