import React, { useState } from "react";
import HomeCard from "../../components/HomeCard";
import { mockCards } from "../../mockData/cardData";
import { mockUser } from "../../mockData/userData";
import OfferPage from "../OfferPage";
import UserHeader from "../../components/UserHeader";
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
                <UserHeader user={mockUser} />
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
