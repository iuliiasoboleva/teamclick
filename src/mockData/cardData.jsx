export const mockCards = [
    {
        title: "Фитнес",
        name: "Фитнес курс",
        icon: "./icons/heart.svg",
        backgroundImage: "./fitness-bg.png",
        price: 490,
        stats: {
            rate: 80,
            leadCost: 792,
            conversion: 36
        },
        conditions: [
            { text: "Покупка рекламы у блогеров или владельцев каналов Telegram, Instagram, VK", supported: true },
            { text: "Покупка рекламы у блогеров или владельцев каналов Telegram, Instagram, VK", supported: true },
            { text: "Покупка рекламы у блогеров или владельцев каналов Telegram, Instagram, VK", supported: true },
            { text: "Покупка рекламы у блогеров или владельцев каналов Telegram, Instagram, VK", supported: false },
            { text: "Покупка рекламы у блогеров или владельцев каналов Telegram, Instagram, VK", supported: false },
        ]
    },
    {
        title: "Йога",
        icon: "./icons/heart.svg",
        backgroundImage: "./fitness-bg.png",
        price: 650,
        stats: {
            rate: 75,
            leadCost: 720,
            conversion: 40
        },
        conditions: [
            { text: "Высокая конверсия", supported: true },
            { text: "Постоянные клиенты", supported: true },
            { text: "Бесплатная доставка", supported: false },
            { text: "Доступно по всей России", supported: true },
            { text: "Скидки для новых клиентов", supported: true },
        ]
    }
];
