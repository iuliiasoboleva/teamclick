import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import WithdrawComponent from "../../components/WithdrawComponent";
import { mockUser } from "../../mockData/userData";
import { mockPayments } from "../../mockData/paymentHistoryData";
import PaymentCard from "../../components/PaymentCard";
import "./styles.css";

const WithdrawPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("withdraw");
    const switcherRef = useRef(null);
    const tabRefs = useRef([]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const settingsTabs = [
        {
            id: "withdraw",
            label: "Вывод",
            content: <WithdrawComponent />,
        },
        {
            id: "history",
            label: "История",
            content: <>
                {mockPayments.map((card, index) => (
                    <PaymentCard
                        key={index}
                        {...card}
                    />
                ))}
            </>,
        }
    ];

    useEffect(() => {
        const activeTabIndex = settingsTabs.findIndex(tab => tab.id === activeTab);

        if (tabRefs.current[activeTabIndex] && switcherRef.current) {
            const tabWidth = tabRefs.current[activeTabIndex].offsetWidth;
            const tabLeft = tabRefs.current[activeTabIndex].offsetLeft;

            switcherRef.current.style.width = `${tabWidth}px`;
            switcherRef.current.style.transform = `translateX(${tabLeft}px)`;
        }
    }, [activeTab]);

    return (
        <div className="settings-page">
            <UserHeader user={mockUser} />
            <div className="settings-inner-block">
                <div className="settings-title-block">
                    <div className="settings-title-container">
                        <div className="training-back-button" onClick={handleGoBack}>
                            <img src="/icons/arrow-left.svg" alt="Left arrow" />
                        </div>

                        <div className="settings-tab-container">
                            <div ref={switcherRef} className="settings-tab-switcher" />

                            {settingsTabs.map((tab, index) => (
                                <button
                                    key={tab.id}
                                    ref={(el) => (tabRefs.current[index] = el)}
                                    className={`settings-tab-button ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="settings-tab-content">
                    {settingsTabs.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
};

export default WithdrawPage;
