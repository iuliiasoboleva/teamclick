export const mockModules = [
    {
        id: 1,
        name: "Модуль №1",
        title: "Погружение в рабочую среду",
        price: 20000,
        tokens: 856,
        isActive: true,
        background: "./module-background.png",
    },
    {
        id: 2,
        name: "Модуль №2",
        title: "Изучение базовых навыков",
        price: 18000,
        tokens: 700,
        isActive: false,
        background: "./module-background.png",
    },
    {
        id: 3,
        name: "Модуль №3",
        title: "Изучение базовых навыков",
        price: 18000,
        tokens: 700,
        isActive: false,
        background: "./module-background.png",
    },
];

export const mockLessons = [
    {
        id: 1,
        name: "Урок №1",
        title: "Введение в рабочую среду",
        price: 5000,
        tokens: 200,
        isActive: true,
        isPractical: false,
        background: "./lesson-background.png",
        videoUrl: "/video-example.mp4",
        homework: {
            title: "Домашнее задание к выполнению:",
            subtitle: "Шаги для выполнения задания:",
            steps: [
                {
                    title: "Скачай приложение Instagram",
                    details: [
                        "Зайди в Google Play (для Android) или App Store (для iOS).",
                        "Найди приложение \"Instagram\" и скачай его на свое устройство."
                    ]
                },
                {
                    title: "Создай новый аккаунт",
                    details: [
                        "Открой приложение Instagram.",
                        "Нажми на кнопку \"Зарегистрироваться\"."
                    ]
                },
                {
                    title: "Выбери один из способов регистрации",
                    details: [
                        "Через электронную почту.",
                        "Через номер телефона.",
                        "Через Facebook (если у тебя есть аккаунт)."
                    ]
                },
                {
                    title: "Заполни информацию",
                    details: [
                        "Введи свое имя, адрес электронной почты или номер телефона.",
                        "Придумай уникальное имя пользователя (логин) и пароль.",
                        "Укажи дату рождения.",
                        "При необходимости добавь фотографию профиля."
                    ]
                },
                {
                    title: "Настрой профиль",
                    details: [
                        "Перейди в свой профиль (иконка с изображением человека в правом нижнем углу).",
                        "Заполни поля: \"Имя\", \"Описание\" и добавь ссылку (если есть).",
                        "Выбери, хотите ли вы сделать профиль публичным или закрытым."
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        name: "Урок №2",
        title: "Основы работы с командой",
        price: 4500,
        tokens: 180,
        isActive: true,
        isPractical: true,
        background: "./lesson-background-2.png",
        videoUrl: "/video-example.mp4",
    },
    {
        id: 3,
        name: "Урок №3",
        title: "Решение задач",
        price: 6000,
        tokens: 250,
        isActive: false,
        isPractical: false,
        background: "./lesson-background.png",
        videoUrl: "/video-example.mp4",
    }
];
