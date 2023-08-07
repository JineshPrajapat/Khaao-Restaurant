import React, {useState, useEffect} from "react";
import './FlashMessage.scss';

const FlashMessage = ({type, message}) =>{
    const [showFlash, setShowFlash] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowFlash(false);
        }, 5000);   
        return () =>clearTimeout(timer);                        // flash message disappear after 5 seconds
    }, []);

    return showFlash ? (
        <div className="flash-overlay">
            <div className={`flash-message ${type}`}>
                {message}
            </div>
        </div>
    ) : null;
};

export default FlashMessage;