import React, { useState } from "react";
import SuccessPage from "../../components/SuccessPage";
import StatisticsLinks from "../StatisticsLinks";
import LinkCard from "../../components/LinkCard";
import { mockLinks } from "../../mockData/linkData";
import "./styles.css";

const Statistics = () => {
    const statisticsTabs = [
        {
            id: "links",
            label: "Ссылки",
            content: <StatisticsLinks />
        },
        {
            id: "history",
            label: "История",
            content:
                <>
                    <div className="statistics-links-content">
                        <h2 className="statistics-tab-title">История продаж</h2>
                    </div>
                    {mockLinks.map((card, index) => (
                        <LinkCard
                            key={index}
                            history={true}
                            {...card}
                        />
                    ))}
                </>
        }
    ];

    const [activeTab, setActiveTab] = useState(statisticsTabs[0].id);

    return (
        <div className="statistics-page">
            <div className="statistics-main-content">
                <h2 className="statistics-tab-title">Статистика</h2>

                <div className="statistics-tab-container">
                    <div
                        className="statistics-tab-switcher"
                        style={{ left: `${statisticsTabs.findIndex(tab => tab.id === activeTab) * 50}%` }}
                    />
                    {statisticsTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`statistics-tab-button ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="statistics-tab-content">
                    {statisticsTabs.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
