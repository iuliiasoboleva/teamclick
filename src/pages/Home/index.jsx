import React, { useState } from "react";
import HomeCard from "../../components/HomeCard";
import { mockCards } from "../../mockData/cardData";
import { mockUser } from "../../mockData/userData";
import { formatNumber } from "../../helpers";
import OfferPage from "../OfferPage";
import "./styles.css";

const Home = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleBack = () => {
        setSelectedOffer(null);
    };

    const tabs = [
        {
            id: "tab1",
            label: "Уровень 1",
            content: mockCards.map((card, index) => (
                <HomeCard key={index} {...card} onMoreClick={() => setSelectedOffer(card)} />
            )),
        },
        {
            id: "tab2",
            label: "Уровень 2",
            content: "Содержимое второй вкладки",
        },
        {
            id: "tab3",
            label: "Уровень 3",
            content: "Содержимое третьей вкладки",
        },
    ];

    return (
        selectedOffer ? (
            <OfferPage offer={selectedOffer} onBack={handleBack} />
        ) :
            <div className="home-container">
                <div className="home-header">
                    <div className="home-header-top">
                        <div className="home-header-user-block">
                            <div className="home-header-image-block">
                                <img className="home-header-image" src={mockUser.avatar} alt="Profile image" />
                                <p className="home-header-pro">PRO</p>
                            </div>
                            <div className="home-header-text">
                                <p className="user-name">{mockUser.name}</p>
                                <p className="user-role">{mockUser.role}</p>
                            </div>
                        </div>
                        <div className="home-header-label">
                            <img src="./icons/crown.svg" alt="Grade" />
                            <p>Ранг {mockUser.rank}</p>
                        </div>
                    </div>
                    <div className="home-header-table-info">
                        <div className="table-column">
                            <img className="table-column-image" src="./icons/cardholder.svg" alt="Cardholder" />
                            <div>
                                <p className="table-label">Баланс</p>
                                <p className="table-value">{formatNumber(mockUser.balance)} ₽</p>
                            </div>
                        </div>
                        <div className="table-divider"></div>
                        <div className="table-column">
                            <img className="table-column-image" src="./icons/tokens.svg" alt="Tokens" />
                            <div>
                                <p className="table-label">Токены</p>
                                <p className="table-value">{formatNumber(mockUser.tokens)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-main-content">
                    <h2 className="home-tab-title">Выберите оффер</h2>

                    <div className="home-tab-container">
                        <div
                            className="tab-switcher"
                            style={{ left: `${tabs.findIndex(tab => tab.id === activeTab) * 33.33}%` }}
                        />
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {tabs.find((tab) => tab.id === activeTab)?.content}
                    </div>
                </div>
            </div>
    );
};

export default Home;
