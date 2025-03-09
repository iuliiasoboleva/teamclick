import React, { useState } from "react";
import "./styles.css";

const SuccessPage = () => {
    const link = "teamclick.app.tg/as75yf";
    const [buttonText, setButtonText] = useState("Копировать ссылку");

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
        setButtonText("Ссылка скопирована!");

        setTimeout(() => setButtonText("Копировать ссылку"), 2000);
    };

    return (
        <div className="success-container">
            <img className="success-icon" src="/thumbs-up.png" alt="Success" />
            <h2>Поздравляем!</h2>
            <p className="success-text">
                Твоя ссылка готова, ты можешь приступать к работе!
            </p>

            <div className="steps">
                {[
                    "Создай ссылку",
                    "Обучайся и запускай источники трафика",
                    "Получай до 85% с каждой продажи",
                    "Список доступных ссылок во вкладке «Статистика»",
                ].map((text, index) => (
                    <div key={index} className="step">
                        <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                        <p>{text}</p>
                    </div>
                ))}
            </div>

            <div className="link-container">
                <img src="/icons/link-gray.svg" alt="Link icon" />
                <span>{link}</span>
            </div>

            <button className="link-container-button" onClick={handleCopy}>
                <img src="/icons/copy.svg" alt="Create link" />
                <span>{buttonText}</span>
            </button>
        </div>
    );
};

export default SuccessPage;
