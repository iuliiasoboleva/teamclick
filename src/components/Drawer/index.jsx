import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const Drawer = ({ isOpen, onClose, onLinkCreated }) => {
    const [selectedTrafficSource, setSelectedTrafficSource] = useState(null);
    const [uniqueName, setUniqueName] = useState("");
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [errors, setErrors] = useState({ select: false, input: false });

    const selectRef = useRef(null);

    const trafficSources = [
        { value: "telegram", label: "Telegram", icon: "./icons/telegram.svg" },
        { value: "instagram", label: "Instagram", icon: "./icons/instagram.svg" },
        { value: "youtube", label: "YouTube", icon: "./icons/youtube.svg" },
        { value: "tiktok", label: "TikTok", icon: "./icons/tiktok.svg" },
    ];

    const handleConfirmClick = () => {
        const newErrors = {
            select: !selectedTrafficSource,
            input: !uniqueName.trim(),
        };

        setErrors(newErrors);

        if (!newErrors.select && !newErrors.input) {
            onClose();
            onLinkCreated();
        }
    };

    const handleSelect = (source) => {
        setSelectedTrafficSource(source);
        setErrors((prev) => ({ ...prev, select: false }));
        setIsSelectOpen(false);
    };

    const handleInputChange = (e) => {
        setUniqueName(e.target.value);
        setErrors((prev) => ({ ...prev, input: false }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        };

        if (isSelectOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isSelectOpen]);

    return (
        <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className={`drawer ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="drawer-content">
                    <div className="drawer-line"></div>
                    <img className="green-flag" src="./green-flag.png" alt="Green flag" />
                    <p className="drawer-text">
                        Мы на финишной прямой, осталось внести немного информации,<span> чтобы ты не запутался когда пойдут продажи</span>
                    </p>

                    <div className={`custom-select-container ${isSelectOpen ? "open" : ""} ${errors.select ? "error" : ""}`} ref={selectRef}>
                        <div className="custom-select-header" onClick={() => setIsSelectOpen(!isSelectOpen)}>
                            <div>
                                <img
                                    src={selectedTrafficSource ? selectedTrafficSource.icon : "./icons/source.svg"}
                                    alt="Traffic source"
                                    className={`input-icon ${errors.select ? "error-icon" : ""}`}
                                />
                                <span>
                                    {selectedTrafficSource ? selectedTrafficSource.label : "Источник трафика"}
                                </span>
                            </div>
                            <img
                                src={isSelectOpen ? "./icons/select-up.svg" : "./icons/select-down.svg"}
                                alt="Select arrow"
                                className={errors.select ? "error-icon" : ""}
                            />
                        </div>

                        {isSelectOpen && (
                            <ul className="custom-select-options">
                                {trafficSources.map((source) => (
                                    <li key={source.value} onClick={() => handleSelect(source)}>
                                        <img src={source.icon} alt={source.label} />
                                        {source.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={`drawer-input-container ${errors.input ? "error" : ""}`}>
                        <img
                            src={errors.input ? "./icons/pencil-error.svg" : "./icons/pencil.svg"}
                            alt="Edit"
                            className="input-icon"
                        />
                        <input
                            type="text"
                            placeholder="Уникальное название"
                            value={uniqueName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="drawer-confirm-button" onClick={handleConfirmClick}>
                        <img src="./icons/link.svg" alt="Create link" />
                        <span>Создать ссылку</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
