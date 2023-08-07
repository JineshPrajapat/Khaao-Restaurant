import React from 'react';
import { images} from '../../constants';
import './Slides.scss';

const slidingimages = [
    {
        imgUrl: images.pexels5
    },
    {
        imgUrl: images.pexels1
    },
    {
        imgUrl: images.reviewimg
    },
    {
        imgUrl: images.pexels3
    },
    {
        imgUrl: images.pexels2
    },
    {
        imgUrl: images.aifood
    }
]
function Slides() {
    return (
        <div className="slides">
            {slidingimages.map((image, index) => (
                <div key={index} style={{ "--x": `${index * 4}s` }}>
                    
                    <img src={image.imgUrl} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default Slides;
