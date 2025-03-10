import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import { mockUser } from "../../mockData/userData";
import "./styles.css";

const Settings = () => {
    const navigate = useNavigate();

    const [isTipsEnabled, setIsTipsEnabled] = useState(false);
    const [shopTooltipVisible, setShopTooltipVisible] = useState(false);
    const [supportTooltipVisible, setSupportTooltipVisible] = useState(false);
    const [leaderboardTooltipVisible, setLeaderboardTooltipVisible] = useState(false);

    const handleToggleTips = () => {
        setIsTipsEnabled((prev) => !prev);
    };

    const handleShopClick = () => {
        setShopTooltipVisible(true);
        setTimeout(() => setShopTooltipVisible(false), 2000);
    };

    const handleSupportClick = () => {
        setSupportTooltipVisible(true);
        setTimeout(() => setSupportTooltipVisible(false), 2000);
    };

    const handleLeaderboardClick = () => {
        setLeaderboardTooltipVisible(true);
        setTimeout(() => setLeaderboardTooltipVisible(false), 2000);
    };

    const handleWithdrawClick = () => {
        navigate("/settings/withdraw");
    };

    return (
        <div className="home-container">
            <UserHeader user={mockUser} />
            <div className="settings-main-content">
                <h2 className="home-tab-title">Финансы</h2>
                <div className="settings-items">
                    <div className="settings-item" onClick={handleWithdrawClick}>
                        <img className="settings-item-image" src="/icons/wallet.svg" alt="Wallet" />
                        <p className="settings-item-text">Вывод средств</p>
                    </div>
                    <div
                        className="settings-item"
                        onClick={handleShopClick}
                    >
                        <img className="settings-item-image" src="/icons/bag.svg" alt="Bag" />
                        <p className="settings-item-text">Магазин призов</p>

                        {shopTooltipVisible && (
                            <div className="settings-tooltip">
                                Реализуется...
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="home-main-content">
                <h2 className="home-tab-title">Помощь</h2>
                <div className="settings-items">
                    <div className="settings-item tip-toggle">
                        <div className="settings-item">
                            <img className="settings-item-image" src="/icons/stars.svg" alt="Stars" />
                            <p className="settings-item-text">Вкл/выкл подсказки</p>
                        </div>
                        <div
                            className={`toggle-switch ${isTipsEnabled ? "active" : ""}`}
                            onClick={handleToggleTips}
                        >
                            <div className="toggle-thumb" />
                        </div>
                    </div>
                    <div className="settings-item" onClick={handleSupportClick}                    >
                        <img className="settings-item-image" src="/icons/chat.svg" alt="Chat" />
                        <p className="settings-item-text">Связь с поддержкой</p>
                        {supportTooltipVisible && (
                            <div className="settings-tooltip">
                                Реализуется...
                            </div>
                        )}
                    </div>
                    <div className="settings-item" onClick={handleLeaderboardClick} >
                        <img className="settings-item-image" src="/icons/chart.svg" alt="Chart" />
                        <p className="settings-item-text">Таблица лидеров</p>
                        {leaderboardTooltipVisible && (
                            <div className="settings-tooltip">
                                Реализуется...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
