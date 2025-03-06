import React from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const LinkCard = ({ title, icon, labelName, stats, onMoreClick }) => {
    const statLabels = {
        clicks: "Клики",
        income: "Доход",
    };

    return (
        <div className="link-card">
            <div className="link-card-top-row">
                <div className="link-card-title-block">
                    <img src={icon} alt={title} />
                    <h3>{title}</h3>
                </div>
                <div className="link-card-label">
                    <p>{labelName}</p>
                </div>
            </div>
            <div className="link-card-info-block">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="link-card-info-row">
                        <p className="link-card-info-label">{statLabels[key]}</p>
                        <p className={`link-card-info-value ${value > 0 ? "positive-value" : ""}`}
                        >
                            {key === "income" && value > 0 ? formatNumber(value) + "₽" : value + ""}
                        </p>
                    </div>
                ))}
            </div>
            <button className="link-card-more-button" onClick={onMoreClick}>
                <img src="./icons/link-info.svg" alt="Link info" />
                <span>Информация о ссылке</span>
            </button>
        </div>
    );
};

export default LinkCard;
