import React from 'react';
import { images } from '../../constants';
import '@fortawesome/fontawesome-free/css/all.css';

import './Services.scss';

const Services = () => {
    return (
        <div className="services" id="services">
            <h2 className="heading">Our <span>Services</span></h2>
            <p className="heading">What we do</p>
            <div className="container">
                <div className="services-grid services-grid-1">
                    <div className="services-info services-info-1">
                        <i className="fa fa-cutlery" aria-hidden="true"></i>
                        <h4>Breakfast</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="services-info services-info-2">
                        <i className="fa fa-glass" aria-hidden="true"></i>
                        <h4>Drinks</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="services-info services-info-3">
                        <i className="fa fa-lemon-o" aria-hidden="true"></i>
                        <h4>Starters recipes</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="services-info services-info-4">
                        <i className="fa fa-spoon" aria-hidden="true"></i>
                        <h4>Soup recipes</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="services-info services-info-5">
                        <i className="fa fa-cutlery" aria-hidden="true"></i>
                        <h4>Dinner Food</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="services-info services-info-6">
                        <i className="fa fa-coffee" aria-hidden="true"></i>
                        <h4>Coffee</h4>
                        <p>Quisque accumsan erat dolor. Vestibulum id lacus placerat. Pleasure and blame belongs to duty</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="services-grid services-grid-2">
                    <img src={images.reviewimg} alt="" />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    );
};

export default Services;
