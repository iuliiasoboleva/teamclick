import React, { useEffect, useState } from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const OfferPage = ({ offer, onBack }) => {
    const statLabels = {
        rate: "Ставка",
        leadCost: "Стоимость за лид",
        conversion: "Конверсия",
    };

    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (window.Telegram?.WebApp?.BackButton) {
            const backButton = window.Telegram.WebApp.BackButton;
            backButton.show();
            backButton.onClick(onBack);

            return () => {
                backButton.hide();
                backButton.offClick(onBack);
            };
        }
    }, [onBack]);

    return (
        <div className="offer-page">
            <div className="offer-info-block">
                <div className="offer-details">
                    <h2>{offer.name}</h2>
                    <div className="offer-details-info">
                        {Object.entries(offer.stats).map(([key, value]) => (
                            <div key={key} className="offer-details-info-row">
                                <p className="offer-details-info-label">{statLabels[key]}</p>
                                <p className="offer-details-info-value">
                                    {key === "leadCost" ? formatNumber(value) + "₽" : value + "%"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <img className="offer-info-image" src={offer.backgroundImage} alt="Offer background" />
            </div>

            <div className="offer-conditions">
                <h3>Условия</h3>
                <ul>
                    {offer.conditions.map((condition, index) => (
                        <li key={index} className={condition.supported ? "supported" : "not-supported"}>
                            <img
                                src={condition.supported ? "/icons/check.svg" : "/icons/cross.svg"}
                                alt={condition.supported ? "Поддерживается" : "Не поддерживается"}
                                className="condition-icon"
                            />
                            <span>{condition.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="agreement-section">
                <label className="checkbox-container">
                    <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                    Подтверждаю что ознакомился
                    с правилами работы с данным оферром                </label>
            </div>
            <button className="confirm-button" disabled={!agreed}>Продолжить</button>
        </div>
    );
};

export default OfferPage;
