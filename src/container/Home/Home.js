import React from "react";
import Mid from "../Mid/Mid";
import Menu from "../Menu/Menu";
import Review from "../Review/Review";
import Map from "../Map/Map";
import Slides from "../Slides/Slides";
import Categories from "../Categories/Categories";
import Landing from "../Landing/Landing";
import Subscribe from "../Subscribe/Subscribe";
import Location from "../Location/Location";
import './Home.scss';

function Home() {
    return(
        <div className="home-container">
        <Landing/>
        <Categories/>
        {/* <Slides/> */}
        <Menu/>
        <Location/>
        <Review/>
        {/* <Mid/> */}
        {/* <Map/> */}
        <Subscribe/>
        </div>
    );
}

export default Home;