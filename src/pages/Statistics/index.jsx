import React, { useEffect, useState } from "react";
import { formatNumber } from "../../helpers";
import Drawer from "../../components/Drawer";
import SuccessPage from "../../components/SuccessPage";
import StatisticsLinks from "../StatisticsLinks";
import "./styles.css";

const Statistics = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLinkCreated, setIsLinkCreated] = useState(false);

    const statisticsTabs = [
        {
            id: "links",
            label: "Ссылки",
            content: <StatisticsLinks/>
        },
        {
            id: "history",
            label: "История",
            content: <div>Контент для Истории</div>
        }
    ];

    const [activeTab, setActiveTab] = useState(statisticsTabs[0].id);

    const handleConfirmClick = () => {
        setIsDrawerOpen(true);
    };

    const handleLinkCreated = () => {
        setIsDrawerOpen(false);
        setIsLinkCreated(true);
    };

    return (
        <div className="statistics-page">
            {!isLinkCreated ? (
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

            ) : (
                <SuccessPage />
            )}

            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onLinkCreated={handleLinkCreated} />
        </div>
    );
};

export default Statistics;
