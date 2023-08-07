import React from "react";
import './SuccessMessage.scss';

const SuccessMessage =({message})=>{
    return(
        <div className="success_overlay" onClick={()=> null}>
            <div className="success-pop">
                <h3>{message}</h3>
            </div>
        </div>
    );
}

export default SuccessMessage;
