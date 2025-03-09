import React, { useState } from "react";
import StatisticsChart from "../../components/StatisticsChart";
import LinkCard from "../../components/LinkCard";
import DrawerSort from "../../components/DrawerSort";
import { mockLinks } from "../../mockData/linkData";
import DrawerLinkInfo from "../../components/DrawerLinkInfo";
import "./styles.css";

const StatisticsLinks = () => {
    const [selectedDay, setSelectedDay] = useState("Ср");
    const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedSort, setSelectedSort] = useState("income");

    const sortingOptions = [
        { value: "income", label: "По доходу" },
        { value: "clicks", label: "По количеству кликов" },
        { value: "date", label: "По дате" },
        { value: "name", label: "По названию" },
    ];

    return (
        <>
            <StatisticsChart selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            <div className="statistics-links-content">
                <h2 className="statistics-tab-title">Мои ссылки</h2>
                <div className="statistics-subtitle" onClick={() => setIsSortDrawerOpen(true)}>
                    <img src="/icons/sort.svg" alt="Sort" />
                    <p className="statistics-subtitle-text">Сортировать</p>
                </div>
            </div>

            {mockLinks.map((card, index) => (
                <LinkCard
                    key={index}
                    {...card}
                    onMoreClick={() => {
                        setSelectedOffer(card);
                        setIsDrawerOpen(true);
                    }}
                />
            ))}

            <DrawerSort
                isOpen={isSortDrawerOpen}
                onClose={() => setIsSortDrawerOpen(false)}
                sortingOptions={sortingOptions}
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
                title={'Сортировать'}
            />
            <DrawerLinkInfo
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                linkData={selectedOffer}
            />
        </>
    );
};

export default StatisticsLinks;
