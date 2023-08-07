import React from 'react';
import './Dashboard.scss';
import { images } from '../../constants';

const abouts = [
    {
        title: 'Web Developement',
        imgUrl: images.cart1
    },
    {
        title: 'Web UI/UX',
        imgUrl: images.cart2
    },
    {
        title: 'Phython',
        imgUrl: images.cart3
    },
    {
        title: 'Arduino Uno ',
        imgUrl: images.cart4
    }
]

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard__header">
                <div className='srijan-logo'>
                    <img src={images.logo} className='logok' alt="logo" />
                </div>
                <div className='notification-profile'>
                    <a href="#"><img src={images.notification} className='notification' alt="notification" />
                    </a>
                    <a href="#"><img src={images.jass} alt="jass" />
                    </a>
                </div>
            </header>
            <div className="dashboard__content">
                <div className="dashboard__left-section">
                    <div className="user-profile">
                        <div className="user-photo">
                            <img src={images.jass} alt="jass" />
                        </div>
                        <div className='user-name-email'>
                            <h2 className="user-name">Jass Doe</h2>
                            <p className="user-email">jassdoe@example.com</p>
                        </div>
                    </div>
                    <hr className='hr-line'/>
                    <ul className="dashboard__points">
                        <li className="active">Overview</li>
                        <li>My Courses</li>
                        <li>All Courses</li>
                        <li>Community</li>
                        <li>Settings</li>
                    </ul>
                </div>
                <hr className="vertical-line"></hr>
                <div className="dashboard__right-section">
                    <h2>Welcome back, <br />Jass!</h2>
                    <div className="recent-videos">
                        <div className="video-scroll-container">
                            {abouts.map((about, index) => (
                                <div className='video__profile-item' key={about.title + index}>
                                    <div className='video__mid-img'>
                                        <img src={about.imgUrl} alt={about.title} />
                                    </div>
                                    <div className='video__below-part'>
                                        <h2 className='bold-text' style={{ margin: 5 }}>{about.title}</h2>
                                        <button>Resume Learning</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
