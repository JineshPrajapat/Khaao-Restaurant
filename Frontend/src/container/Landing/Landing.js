import React from "react";
import nature from '../../assets/videos/nature.mp4'
import './Landing.scss';

function Landing(){
    return(
        <>
            <div className="banner">
                <div className="natureplay">
                    <video style={{width:'100%'}} preload="auto" loop autoPlay muted>
                        <source src={nature} type="video/mp4"/>
                    </video>
                    <div className="container">
                        <h1>ENJOY A TASTE OF CONVENIENCE - LEAVE THE COOKING TO US.</h1>
                        <p>Always Fresh Everyday.</p>

                        <div className="container__rows">
                            <div className="row">
                                <div className="row-body">
                                    <div className="icon">
                                        <i className="fa fa-shopping-cart" aria-hidden="true"/>
                                    </div>
                                    <div className="info">
                                        <h4>Order</h4>
                                        <p>Just click on the product you desire and proceed to submit your order hassle-free.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="row-body">
                                    <div className="icon">
                                        <i className="fas fa-calendar-check" aria-hidden="true"/>
                                    </div>
                                    <div className="info">
                                        <h4>Reservation</h4>
                                        <p>Securely book a table simply clicking on your desired date and time, and your reservation will be confirmed.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="row-body">
                                    <div className="icon">
                                        <i className="fa fa-cutlery" aria-hidden="true"/>
                                    </div>
                                    <div className="info">
                                        <h4>Services</h4>
                                        <p>Delight in a diverse dining experience with attractive dinner, lunch, breakfast, and drink options to satisfy your palate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;