import React, { useState, useEffect } from "react";
import "./styles.css";

const DrawerLinkInfo = ({ isOpen, onClose, linkData }) => {
    const [name, setName] = useState(linkData?.name || "");
    const [platform, setPlatform] = useState(linkData?.platform || "");
    const [customTitle, setCustomTitle] = useState(linkData?.customTitle || "");
    const [errors, setErrors] = useState({ name: false, platform: false, customTitle: false });
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        setErrors((prev) => ({ ...prev, [field]: false }));
    };

    useEffect(() => {
        if (isOpen) {
            setName(linkData?.name || "");
            setPlatform(linkData?.platform || "");
            setCustomTitle(linkData?.customTitle || "");
        }
    }, [isOpen, linkData]);

    const handleSave = () => {
        onClose();
        setIsSuccessPopupOpen(true);
        setTimeout(() => setIsSuccessPopupOpen(false), 2000);
    };

    return (
        <>
            <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
                <div className={`drawer ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
                    <div className="drawer-content">
                        <div className="drawer-line"></div>
                        <img className="green-flag" src="./link.png" alt="Green flag" />
                        <p className="drawer-link-info-text">
                            Информация о вашей ссылке
                            <span> Дата создания: {linkData?.createdAt}</span>
                        </p>
                        <div className={`drawer-link-info-input-container ${errors.name ? "error" : ""}`}>
                            <input
                                type="text"
                                placeholder="Введите имя"
                                value={name}
                                onChange={handleInputChange(setName, "name")}
                            />
                            <img src={"/icons/edit.svg"} alt="Edit" className="input-icon" />
                        </div>
                        <div className={`drawer-link-info-input-container ${errors.platform ? "error" : ""}`}>
                            <input
                                type="text"
                                placeholder="Введите платформу"
                                value={platform}
                                onChange={handleInputChange(setPlatform, "platform")}
                            />
                            <img src={"/icons/edit.svg"} alt="Edit" className="input-icon" />
                        </div>
                        <div className={`drawer-link-info-input-container ${errors.customTitle ? "error" : ""}`}>
                            <input
                                type="text"
                                placeholder="Без названия"
                                value={customTitle}
                                onChange={handleInputChange(setCustomTitle, "customTitle")}
                            />
                            <img src={"/icons/edit.svg"} alt="Edit" className="input-icon" />
                        </div>
                        <div className="link-container">
                            <img src="/icons/link-gray.svg" alt="Link icon" />
                            <span>{linkData?.link}</span>
                        </div>
                        <div className="link-info-buttons">
                            <button className="link-card-more-button" onClick={handleSave}>
                                <img src="/icons/checkmark.svg" alt="Checkmark" />
                                <span>Сохранить изменения</span>
                            </button>
                            <button className="delete-button" onClick={() => { }}>
                                <img src="/icons/delete.svg" alt="Delete icon" />
                                <span>Архивировать ссылку</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isSuccessPopupOpen && (
                <div className="popup-overlay" onClick={() => setIsSuccessPopupOpen(false)}>
                    <div className="success-popup">
                        <img src="/thumbs-up.png" alt="Thumbs up" />
                        <p>Настройки ссылки успешно обновлены</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default DrawerLinkInfo;
