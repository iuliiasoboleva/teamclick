import React from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const HomeCard = ({ title, icon, price, stats, onMoreClick }) => {
    const statLabels = {
        rate: "Ставка",
        leadCost: "Стоимость за лид",
        conversion: "Конверсия",
    };

    return (
        <div className="home-card">
            <div className="home-card-top-row">
                <div className="home-card-title-block">
                    <img src={icon} alt={title} />
                    <h3>{title}</h3>
                </div>
                <div className="home-card-price">
                    <p>{formatNumber(price)}₽</p>
                </div>
            </div>
            <div className="home-card-info-block">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="home-card-info-row">
                        <p className="home-card-info-label">{statLabels[key]}</p>
                        <p className="home-card-info-value">
                            {key === "leadCost" ? formatNumber(value) + "₽" : value + "%"}
                        </p>
                    </div>
                ))}
            </div>
            <button className="home-card-more-button" onClick={onMoreClick}>
                <span>Подробнее</span>
            </button>
        </div>
    );
};

export default HomeCard;
