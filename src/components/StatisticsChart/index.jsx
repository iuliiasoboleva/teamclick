import React, { useEffect, useRef, useState } from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { dataSets } from "../../mockData/chartData";
import { formatNumber } from "../../helpers";
import DrawerSort from "../DrawerSort";
import "./styles.css";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const selectedDate = payload[0].payload.fullDate || "Дата неизвестна";

        return (
            <div className="custom-tooltip">
                <p className="tooltip-date">{selectedDate}</p>
                <p className="tooltip-earnings">
                    Заработано <span className="positive">{payload[0].value} ₽</span>
                </p>
                <p className="tooltip-sales">
                    Продажи <span>{payload[0].payload.sales}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function StatisticsChart({ selectedDay, setSelectedDay }) {
    const periodOptions = [
        { value: "week", label: "7 дней" },
        { value: "month", label: "1 месяц" },
        { value: "sixMonths", label: "6 месяцев" },
        { value: "year", label: "За год" },
    ];

    const offersOptions = [
        { value: "all", label: "Все" },
        { value: "offer-1", label: "Название оффера №1" },
        { value: "offer-2", label: "Название оффера №2" },
        { value: "offer-3", label: "Название оффера №3" },
    ];

    const [isPeriodSelectOpen, setIsPeriodSelectOpen] = useState(false);
    const [isOtherSelectOpen, setIsOtherSelectOpen] = useState(false);
    const [isPeriodDrawerOpen, setIsPeriodDrawerOpen] = useState(false);
    const [isOfferDrawerOpen, setIsOfferDrawerOpen] = useState(false);

    const [selectedPeriod, setSelectedPeriod] = useState("week");
    const [selectedOffer, setSelectedOffer] = useState("all");

    const periodSelectRef = useRef(null);
    const otherSelectRef = useRef(null);

    const data = dataSets[selectedPeriod];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                periodSelectRef.current && !periodSelectRef.current.contains(event.target) &&
                otherSelectRef.current && !otherSelectRef.current.contains(event.target)
            ) {
                setIsPeriodSelectOpen(false);
                setIsOtherSelectOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (data.length > 0 && !data.some(d => d.day === selectedDay)) {
            setSelectedDay(data[0].day);
        }
    }, [selectedPeriod, data.length]);

    const selectedData = data.find(d => d.day === selectedDay) || { earnings: 0, sales: 0, earningsChangePercent: 0, salesChangePercent: 0 };

    return (
        <>
            <div className="statistics-chart">
                <div className="statistics-info">
                    <div className="statistics-info-block">
                        <div className="statistics-info-image">
                            <img className="table-column-image" src="./icons/cardholder.svg" alt="Cardholder" />
                        </div>
                        <div className="statistics-info-text-block">
                            <p>Заработано:</p>
                            <div className="statistics-info-number-block">
                                <p>{formatNumber(selectedData.earnings)} ₽</p>
                                <label className={selectedData.earningsChangePercent >= 0 ? "positive" : "negative"}>
                                    {selectedData.earningsChangePercent >= 0
                                        ? `+${selectedData.earningsChangePercent}%`
                                        : `${selectedData.earningsChangePercent}%`
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="statistics-info-block">
                        <div className="statistics-info-image">
                            <img className="table-column-image" src="./icons/tokens.svg" alt="Tokens" />
                        </div>
                        <div className="statistics-info-text-block">
                            <p>Продажи:</p>
                            <div className="statistics-info-number-block">
                                <p>{formatNumber(selectedData.sales)}</p>
                                <label className={selectedData.salesChangePercent >= 0 ? "positive" : "negative"}>
                                    {selectedData.salesChangePercent >= 0
                                        ? `+${selectedData.salesChangePercent}%`
                                        : `${selectedData.salesChangePercent}%`
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00A859" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#00A859" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tick={{
                                fill: "#AAAAAA",
                                fontSize: 10,
                                fontWeight: 400,
                            }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                        />
                        <YAxis hide />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: "black", strokeDasharray: "5 5" }}
                            isAnimationActive={false}
                            trigger="click"
                        />
                        <Area
                            type="monotone"
                            dataKey="earnings"
                            stroke="#00A859"
                            fill="url(#colorEarnings)"
                            strokeWidth={3}
                            activeDot={{ r: 6, fill: "#FFFFFF", stroke: "#313132", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>

                <div className="chart-select-container">
                    <div className={`chart-select ${isOtherSelectOpen ? "open" : ""}`} ref={otherSelectRef}>
                        <div className="chart-select-header" onClick={() => setIsOfferDrawerOpen(true)}>
                            <span>{offersOptions.find(p => p.value === selectedOffer)?.label.slice(0, 4)}</span>
                            <img src={"./icons/select-down.svg"} alt="Select arrow" />
                        </div>
                    </div>

                    <div className={`chart-select ${isPeriodSelectOpen ? "open" : ""}`} ref={periodSelectRef}>
                        <div className="chart-select-header" onClick={() => setIsPeriodDrawerOpen(true)}>
                            <span>{periodOptions.find(p => p.value === selectedPeriod)?.label.slice(0, 4)}</span>
                            <img src={"./icons/select-down.svg"} alt="Select arrow" />
                        </div>
                    </div>
                </div>
            </div>

            <DrawerSort
                isOpen={isPeriodDrawerOpen}
                onClose={() => setIsPeriodDrawerOpen(false)}
                sortingOptions={periodOptions}
                selectedSort={selectedPeriod}
                setSelectedSort={setSelectedPeriod}
                title={'Показать период за'}
            />
            <DrawerSort
                isOpen={isOfferDrawerOpen}
                onClose={() => setIsOfferDrawerOpen(false)}
                sortingOptions={offersOptions}
                selectedSort={selectedOffer}
                setSelectedSort={setSelectedOffer}
                title={'Показать оффер'}
            />
        </>
    );
}
