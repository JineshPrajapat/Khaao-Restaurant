import React, { useState, useEffect, useRef } from "react";
import { images } from '../../constants';
import './Categories.scss';
import { baseURL } from '../../config/api';
// const categoryImages = [
//     {
//         imgUrl: images.idli,
//         title: 'Junk food'
//     },
//     {
//         imgUrl: images.biryani,
//         title: 'Indian food'
//     },
//     {
//         imgUrl: images.samosa,
//         title: 'Breakfast'
//     },
//     {
//         imgUrl: images.bati,
//         title: 'Lunch'
//     },
//     {
//         imgUrl: images.palakpaneer,
//         title: 'Dinner'
//     },
//     {
//         imgUrl: images.punjabi,
//         title: 'Punjabi'
//     },
//     {
//         imgUrl: images.lassi,
//         title: 'Drink'
//     },
//     {
//         imgUrl: images.kheer,
//         title: 'Starter'
//     },

// ]



function Categories() {

    const [categoryList, setcategoryList] = useState([]);
    const carouselRef = useRef(null);

    //fetching data from server
    const getCategory = async () => {
      try{
        const  response = await fetch(`${baseURL}/category`)
        const jsonData = await response.json();
        setcategoryList(jsonData);
      } catch (err){
        console.error(err.message);
      }
    }

    useEffect(()=>{
      getCategory();
    },[]);

    useEffect(() => {
        const itemWidth = 510; // Adjust the item width to match the scroll distance
    
        const scrollCarousel = () => {
          if (carouselRef.current) {
            carouselRef.current.scrollTo({
              top: 0,
              left: carouselRef.current.scrollLeft + itemWidth,
              behavior: 'smooth',
            });
          }
        };
    
        const scrollInterval = setInterval(scrollCarousel, 5000); // 5000 milliseconds = 5 seconds
    
        // Reset scroll position to the beginning when reaching the end
        carouselRef.current.addEventListener('scroll', () => {
          if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
            carouselRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: 'auto',
            });
          }
        });
    
        return () => {
          clearInterval(scrollInterval);
        };
      }, []);

    return (
        <div className="categories-carousel">
            <h1>Categories</h1>
            <div className="carousel-item" ref={carouselRef}>
                {categoryList?.map((item, index) => (
                    <div className="item rounded-0 border-0 text-center" key={item.category_id + index} >
                        <img src={item.imageurl} alt={item.title} />
                        <a href="#" className="btn btn-primary btn-lg">{item.variety}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;