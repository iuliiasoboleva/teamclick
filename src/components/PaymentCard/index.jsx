import React from "react";
import { formatNumber } from "../../helpers";
import "./styles.css";

const PaymentCard = ({ icon, sum, status, createdAt }) => {
    const getStatusLabel = (status) => {
        switch (status) {
            case "success":
                return "Выполнено";
            case "cancel":
                return "Отменено";
            case "process":
                return "В процессе";
            default:
                return "Неизвестно";
        }
    };

    const getLabelClass = (status) => {
        switch (status) {
            case "success":
                return "success-label";
            case "cancel":
                return "cancel-label";
            case "process":
                return "process-label";
            default:
                return "";
        }
    };

    return (
        <div className="link-card">
            <div className="link-card-top-row">
                <div className="payment-card-title-block">
                    <img src={icon} alt="Payment method" />
                </div>
                <div className={`link-card-label ${getLabelClass(status)}`}>
                    <p>{formatNumber(sum)}₽</p>
                </div>
            </div>

            <div className="link-card-info-block">
                <InfoRow label="Дата" value={createdAt} />
                <InfoRow label="Статус" value={getStatusLabel(status)} />
            </div>
        </div>
    );
};

const InfoRow = ({ label, value, isPositive = false }) => (
    <div className="link-card-info-row">
        <p className="link-card-info-label">{label}</p>
        <p className={`link-card-info-value ${isPositive ? "positive-value" : ""}`}>{value}</p>
    </div>
);

export default PaymentCard;
