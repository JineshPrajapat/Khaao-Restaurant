import React from "react";
import './Subscribe.scss';

function Subscribe() {
    return(
        <div className="subscribe-container">
            <div className="subscribe-quote">
                <h5>Subscribe to our newsletter</h5>
                <h2>For Our Latest <br/>Updates</h2>
            </div>
            <form action="" method="post">
                <input type="email" placeholder="Enter Your Email Address" name="email" required/>
                <button><i className="fa fa-paper-plane fa-bounce"/></button>
            </form>
        </div>
    );
}

export default Subscribe;