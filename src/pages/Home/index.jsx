import React, { useState } from "react";
import "./styles.css";

const tabs = [
    { id: "tab1", label: "Таб 1", content: "Содержимое первой вкладки" },
    { id: "tab2", label: "Таб 2", content: "Содержимое второй вкладки" },
    { id: "tab3", label: "Таб 3", content: "Содержимое третьей вкладки" },
];

const Home = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="home-container">
            <div className="home-header">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>

            <div className="home-tab-container">
                <div className="tab-switcher" style={{ left: `${tabs.findIndex(tab => tab.id === activeTab) * 33.33}%` }} />
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
    );
};

export default Home;
