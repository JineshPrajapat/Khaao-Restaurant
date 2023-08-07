import React from "react";
import './ConfirmationDialog.scss';

const ConfirmationDialog = ({ message, onConfirm }) => {
    return (
        <div className="overlay" onClick={() => onConfirm(false)}>

            <div className="confirmation-popup">
                <h3>{message}</h3>
                <div className="buttons">
                    <button onClick={() => onConfirm(true)}>Yes</button>
                    <button onClick={() => onConfirm(false)}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;