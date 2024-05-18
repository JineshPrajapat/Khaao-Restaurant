import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MotionWrap from '../../wrapper/MotionWrap'
import { images } from '../../constants'
import { Link } from 'react-router-dom'
import './Footer.scss'

function Footer() {
    return (
        <footer>
            <div className="app_footer">
                {/* <div className='app__footer-logo'>
                    <ul>
                        <li><img src={images.logo} className='logok' alt="logo" /></li>
                        <li><h6>All rights reserved.</h6></li>
                    </ul>
                </div> */}
                <div className='footer_contact-link'>
                    <ul>
                        <li className="app_footer-heading">CONTACT</li>
                        <li><a href="tel:8905009554"> 8905009554</a></li>
                        <li><a href="tel:8905009655"> 8905009655</a></li>
                        <li><a href="mailto:chinmayjain854@gmail.com">khaao@gmail.com</a></li>
                        <li><a href="#"> 132 W Main St.<br/>Rishabhdeo, CA 9180</a></li>
                    </ul>
                </div>
                <div className='footer_links-link'>
                    <ul>
                        <li className="app_footer-heading">LINKS</li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className='footer_about-link'>
                    <ul>
                        <li className="app_footer-heading">ABOUT KHAAO</li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/who-we-are">Who We Are</Link></li>
                        <li><Link to="/work-with-us">Work With Us</Link></li>
                        <li><Link to="/report-fraud">Report Fraud</Link></li>
                        <li><Link to="/Services">Services</Link></li>
                    </ul>
                </div>
                <div className='footer_learn-link'>
                    <ul>
                        <li className="app_footer-heading">LEARN MORE</li>
                        <li><Link to="/terms">Terms</Link></li>
                        <li><Link to="/privacy">Privacy</Link></li>
                        <li><Link to="/security">Security</Link></li>
                        <li><Link to="/site-map">Site Map</Link></li>
                    </ul>
                </div>
                <div className='app__footer-social-media-icons'>
                    <div class="btn tw-btn">
                        <a target="_blank" href="https://www.youtube.com" rel="http://www.youtube.com/"><i class="fab 
                fa-youtube"></i></a>
                    </div>
                    <div class="btn tw-btn">
                        <a target="_blank" href="https://www.linkedin.com/in/jinesh-prajapat" rel="http://www.linkedin.com/"><i class="fab 
               fa-linkedin"></i></a>
                    </div>
                    <div class="btn tw-btn">
                        <a target="_blank" href="https://www.twitter.com" rel="http://www.twitter.com/"><i class="fab 
               fa-twitter"></i></a>
                    </div>
                    <div class="btn tw-btn">
                        <a target="_blank" href="https://www.instagram.com" rel="http://www.instagram.com/"><i class="fab 
               fa-instagram"></i></a>
                    </div>
                    <div class="btn tw-btn">
                        <a target="_blank" href="https://www.facebook.com" rel="http://www.facebook.com/"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className="app_footer-hr">
                <p> Khaao. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
