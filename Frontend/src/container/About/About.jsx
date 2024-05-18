import React from "react";
import { images } from '../../constants'
import './About.scss'

function About() {
    return (
        <div class="About">
            <h1>About Us</h1>
            <p>Welcome to My Website! We are a company that specializes in creating high-quality food for our customers. Our
                mission is to provide the best possible service and value to our customers, while also creating a positive impact
                on
                the world.</p>
            <h2>Our Team</h2>
            <ul>
                <li>Nilesh Prajapat - CEO</li>
                <li>Jinesh Prajapat - CTO</li>
                <li>Ashok Jain - CFO</li>
                <li>Sara Williams - COO</li>
            </ul>
            <h2>Our History</h2>
            <p>My Website was founded in 2023 by Jinesh Prajapat and Nilesh Prajapat. Since then, we have grown into a successful
                business
                with a global presence. Our food service have won multiple awards for their quality and innovation, and we
                continue
                to push the boundaries of what's possible.</p>
        </div>
    );
}

export default About;