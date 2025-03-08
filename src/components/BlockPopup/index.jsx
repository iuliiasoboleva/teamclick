import React from 'react';
import './styles.css';

const BlockPopup = ({ isOpen, onClose, text, subtext }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="block-popup-overlay" onClick={handleOverlayClick}>
            <div className="block-popup-content">
                <img src="./block-popup-image.png" alt="Popup" className="block-popup-image" />
                <p className="block-popup-text">{text} <span>{subtext}</span></p>
            </div>
        </div>
    );
};

export default BlockPopup;
