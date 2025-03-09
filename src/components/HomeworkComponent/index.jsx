import React, { useState } from "react";
import "./styles.css";
import HomeworkPopup from "../HomeworkPopup";

const HomeworkComponent = ({ homework }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState("");

    const handleOpenPopup = (type) => {
        setPopupType(type);
        setIsPopupOpen(true);
    };
console.log('isPopupOpen', isPopupOpen)
    return (
        <div className="homework-container">
            <div className="homework-title-block">
                <label className="homework-title-label">
                    <img src="./icons/homework-icon.svg" alt="Exclamation" />
                </label>
                <h1 className="homework-title">{homework.title}</h1>
            </div>
            <p className="homework-subtitle">{homework.subtitle}</p>

            <div className="homework-steps">
                {homework.steps.map((step, index) => (
                    <div key={index} className="homework-step">
                        <p className="step-number">0{index + 1}</p>
                        <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <ul className="step-details">
                                {step.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="homework-buttons">
                <button
                    className="drawer-confirm-button"
                    onClick={() => handleOpenPopup("send")}
                >
                    <img src="./icons/send-icon.svg" alt="Send icon" />
                    <span>Отправить задание</span>
                </button>
                <button
                    className="drawer-confirm-button"
                    onClick={() => handleOpenPopup("download")}
                >
                    <img src="./icons/download-blue.svg" alt="Download icon" />
                    <span>Получить материалы д/з</span>
                </button>
            </div>

            <HomeworkPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                type={popupType}
            />
        </div>
    );
};

export default HomeworkComponent;
