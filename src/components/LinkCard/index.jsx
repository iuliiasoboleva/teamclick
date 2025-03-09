import React from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const LinkCard = ({ title, icon, labelName, income, stats, onMoreClick, history, createdAt, link }) => {
    return (
        <div className="link-card">
            <div className="link-card-top-row">
                <div className="link-card-title-block">
                    <img src={icon} alt={title} />
                    <h3>{title}</h3>
                </div>
                <div className={history ? "link-card-price-label" : "link-card-label"}>
                    <p>{history ? `${income > 0 ? "+" : ""}${income}₽` : labelName}</p>
                </div>
            </div>

            <div className="link-card-info-block">
                {history ? (
                    <>
                        <InfoRow label="Дата" value={createdAt} />
                        <InfoRow label="Ссылка" value={link} />
                    </>
                ) : (
                    Object.entries(stats).map(([key, value]) => (
                        <InfoRow
                            key={key}
                            label={key === "clicks" ? "Клики" : "Доход"}
                            value={key === "income" && value > 0 ? `${formatNumber(value)}₽` : value}
                            isPositive={key === "income" && value > 0}
                        />
                    ))
                )}
            </div>

            {onMoreClick && (
                <button className="link-card-more-button" onClick={onMoreClick}>
                    <img src="/icons/link-info.svg" alt="Link info" />
                    <span>Информация о ссылке</span>
                </button>
            )}
        </div>
    );
};

const InfoRow = ({ label, value, isPositive = false }) => (
    <div className="link-card-info-row">
        <p className="link-card-info-label">{label}</p>
        <p className={`link-card-info-value ${isPositive ? "positive-value" : ""}`}>{value}</p>
    </div>
);

export default LinkCard;
