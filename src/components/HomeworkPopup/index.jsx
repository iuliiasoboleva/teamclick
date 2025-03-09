import React from "react";
import "./styles.css";

const HomeworkPopup = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    const content = type === "send"
        ? {
            imgUrl: "/send.png",
            title: "Нажав на кнопку вы перейдете в Telegram-бота,",
            message: "который выдаст вам материалы к выполнению домашнего задания.",
            question: "Вы уверены?",
            linkUrl: "https://t.me/your-bot-link"
        }
        : {
            imgUrl: "/download.png",
            title: "Нажав на кнопку вы начнете переписку с менеджером,",
            message: "для отправки на проверку домашнего задания.",
            question: "Вы уверены?",
            linkUrl: "https://t.me/your-manager-link"
        };

    const handleLinkClick = () => {
        if (content.linkUrl) {
            window.open(content.linkUrl, "_blank");
        } else {
            console.warn("Ссылка отсутствует");
        }
    };

    return (
        <div className="homework-popup-overlay" onClick={onClose}>
            <div className="homework-popup-content" onClick={(e) => e.stopPropagation()}>
                <img className="homework-popup-image" src={content.imgUrl} alt="Popup icon" />
                <p className="homework-popup-message">
                    {content.title}{" "}
                    <span>{content.message}</span>{" "}
                    {content.question}
                </p>
                <div className="homework-popup-buttons">
                    <button className="link-card-more-button" onClick={handleLinkClick}>
                        <img src="/icons/link-info.svg" alt="Link info" />
                        <span>Перейти в Telegram</span>
                    </button>
                    <button className="homework-popup-cancel-button" onClick={onClose}>
                        Вернуться назад
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeworkPopup;
