import React, { useEffect, useState } from "react";
import { formatNumber } from "../../helpers";
import Drawer from "../../components/Drawer";
import SuccessPage from "../../components/SuccessPage";
import StatisticsChart from "../../components/StatisticsChart";
import LinkCard from "../../components/LinkCard";
import { mockLinks } from "../../mockData/linkData";
import "./styles.css";

const StatisticsLinks = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLinkCreated, setIsLinkCreated] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Ср");

    const handleConfirmClick = () => {
        setIsDrawerOpen(true);
    };

    const handleLinkCreated = () => {
        setIsDrawerOpen(false);
        setIsLinkCreated(true);
    };

    return (
        <>
            <StatisticsChart selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            <div className="statistics-links-content">
                <h2 className="statistics-tab-title">Мои ссылки</h2>
                <div className="statistics-subtitle">
                    <img src="./icons/sort.svg" alt="Sort" />
                    <p className="statistics-subtitle-text">Сортировать</p>
                </div>
            </div>
            {mockLinks.map((card, index) => (
                <LinkCard key={index} {...card} onMoreClick={() => { }} />
            ))}
        </>
    );
};

export default StatisticsLinks;
