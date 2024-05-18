import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import MotionWrap from "../../wrapper/MotionWrap";
import { images } from '../../constants';
import ReviewForm from "../ReviewForm/ReviewForm";
import './Review.scss';

const customerreview = [
    {
        comments: 'This Khao restaurant has left the best impressions! Hospitable hosts, delicious dishes, beautiful presentation, wide wine list and wonderful dessert. I recommend to everyone! I would like to come backhere again and again.',
        imgUrl: images.garima,
        name: 'Garima'
    },
    {
        comments: 'It’s a great experience. The ambiance is very welcoming and charming. Amazing wines, food and service. Staff are extremely knowledgeable and make great recommendations.',
        imgUrl: images.laksh,
        name: 'Laksh Raj'
    },
    {
        comments: 'Excellent food. Menu is extensive and seasonal to a particularly high standard. Definitely fine dining. It can be expensive but worth it and they do different deals on different nights so it’s worth checking them out before you book. Highly recommended.',
        imgUrl: images.luv,
        name: 'Luv Panchal'
    },
    {
        comments: 'Amazing experience! If you thought gourmet kitchen will leave you hungry, think again. You should skip several meals before visiting this amazing restaurant. Everything is so tasty, you cannot restraint yourself from having all of the dishes.',
        imgUrl: images.shashank,
        name: 'Shashank Jain'
    },
    {
        comments: 'The menus options are an excellent value. The dining experience overall is very pleasant. I highly recommend this restaurant.',
        imgUrl: images.jinesh,
        name: 'Jinesh Prajapat'
    },
    {
        comments: ' Amaazing food! The whole experience from start to finish is great waitress is always so friendly and kind. The food can’t get better and the prices are fair for the portion size. Always a great spot to get great food',
        imgUrl: images.yuvraj,
        name: 'Yuvraj Singh'
    }
]

function Review() {

    const [reviewData, setReviewData] = useState(customerreview);

    return (
        <section className="review">
            <h1 className="head">Customer's <span>Reviews</span></h1>
            <div className="box-cont ">
                {reviewData.map((item, index) => (
                    <div className="box">
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <p>{item.comments}</p>
                        <div className="user">
                            <img src={item.imgUrl} alt={item.name} />
                            <div className="user-info">
                                <h3>{item.name}</h3>
                                <span>Happy customer</span>
                            </div>
                        </div>
                        <span className="fas fa-quote-right"></span>
                    </div>
                ))}
            </div>
            <div>
            <ReviewForm/>
            </div>
        </section>
    );
}

export default Review