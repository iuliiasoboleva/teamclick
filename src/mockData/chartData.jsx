const today = new Date();
const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const formatDate = (date) => {
    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

const getLastWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (6 - i));
        return { day: daysOfWeek[date.getDay()], fullDate: formatDate(date) };
    });
};

const getLastMonthDays = () => {
    const result = [];
    for (let i = 0; i < 30; i += 5) {
        const date = new Date();
        date.setDate(today.getDate() - (30 - i));

        if (date > today) break;

        result.push({ day: date.getDate().toString(), fullDate: formatDate(date) });
    }
    return result;
};

const getLastSixMonths = () => {
    return Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(today.getMonth() - (5 - i));
        return { day: months[date.getMonth()], fullDate: formatDate(date) };
    });
};

const getLastYearMonths = () => {
    return Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(today.getMonth() - (11 - i));
        return { day: months[date.getMonth()], fullDate: formatDate(date) };
    });
};

const weekDays = getLastWeekDays();
const monthDays = getLastMonthDays();
const sixMonths = getLastSixMonths();
const yearMonths = getLastYearMonths();

export const dataSets = {
    week: [
        { day: weekDays[0].day, fullDate: weekDays[0].fullDate, earnings: 15000, sales: 80, earningsChangePercent: 0, salesChangePercent: 0 },
        { day: weekDays[1].day, fullDate: weekDays[1].fullDate, earnings: 18000, sales: 95, earningsChangePercent: 20, salesChangePercent: 18.75 },
        { day: weekDays[2].day, fullDate: weekDays[2].fullDate, earnings: 23431, sales: 113, earningsChangePercent: 30.17, salesChangePercent: 18.95 },
        { day: weekDays[3].day, fullDate: weekDays[3].fullDate, earnings: 21000, sales: 102, earningsChangePercent: -10.36, salesChangePercent: -9.73 },
        { day: weekDays[4].day, fullDate: weekDays[4].fullDate, earnings: 27000, sales: 130, earningsChangePercent: 28.57, salesChangePercent: 27.45 },
        { day: weekDays[5].day, fullDate: weekDays[5].fullDate, earnings: 32000, sales: 145, earningsChangePercent: 18.52, salesChangePercent: 11.54 },
        { day: weekDays[6].day, fullDate: weekDays[6].fullDate, earnings: 29000, sales: 135, earningsChangePercent: -9.38, salesChangePercent: -6.90 }
    ],
    month: monthDays.map(({ day, fullDate }, index) => ({
        day,
        fullDate,
        earnings: 12000 + index * 5000,
        sales: 50 + index * 20,
        earningsChangePercent: index === 0 ? 0 : 10,
        salesChangePercent: index === 0 ? 0 : 10,
    })),
    sixMonths: sixMonths.map(({ day, fullDate }, index) => ({
        day,
        fullDate,
        earnings: 80000 + index * 10000,
        sales: 400 + index * 50,
        earningsChangePercent: index === 0 ? 0 : 10,
        salesChangePercent: index === 0 ? 0 : 10,
    })),
    year: yearMonths.map(({ day, fullDate }, index) => ({
        day,
        fullDate,
        earnings: 100000 + index * 10000,
        sales: 450 + index * 50,
        earningsChangePercent: index === 0 ? 0 : 10,
        salesChangePercent: index === 0 ? 0 : 10,
    })),
};
