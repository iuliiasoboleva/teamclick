import React, { useEffect, useState } from "react";
import { formatNumber } from "../../helpers";
import Drawer from "../../components/Drawer";
import SuccessPage from "../../components/SuccessPage";
import "./styles.css";

const OfferPage = ({ offer, onBack }) => {
    const statLabels = {
        rate: "Ставка",
        leadCost: "Стоимость за лид",
        conversion: "Конверсия",
    };

    const [isChecked, setIsChecked] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLinkCreated, setIsLinkCreated] = useState(false);

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

    const handleConfirmClick = () => {
        setIsDrawerOpen(true);
    };

    const handleLinkCreated = () => {
        setIsDrawerOpen(false);
        setIsLinkCreated(true);
    };

    return (
        <div className="offer-page">
            {!isLinkCreated ? (
                <>
                    <div className="offer-info-block">
                        <div className="offer-details">
                            <h2>{offer.name}</h2>
                            <div className="offer-details-info">
                                {Object.entries(offer.stats).map(([key, value]) => (
                                    <div key={key} className="offer-details-info-row">
                                        <p className="offer-details-info-label">{statLabels[key]}</p>
                                        <p className="offer-details-info-value">
                                            {key === "leadCost"
                                                ? formatNumber(value) + "₽"
                                                : value + "%"}
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

                    <label className="checkbox-container">
                        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        <img src={isChecked ? "/icons/checked.svg" : "/icons/unchecked.svg"} alt={isChecked ? "Выбрано" : "Не выбрано"} />
                        <p>
                            Подтверждаю, что ознакомился с
                            <a href="/rules" target="_blank" rel="noopener noreferrer"> правилами работы</a> с данным оффером
                        </p>
                    </label>

                    <button className="confirm-button" onClick={handleConfirmClick}>
                        <img src="./icons/link.svg" alt="Create link" />
                        <span>Создать ссылку</span>
                    </button>
                </>
            ) : (
                <SuccessPage/>
            )}

            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onLinkCreated={handleLinkCreated} />
        </div>
    );
};

export default OfferPage;
