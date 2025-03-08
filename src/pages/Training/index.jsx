import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUser } from "../../mockData/userData";
import { mockModules, mockLessons } from "../../mockData/moduleData";
import { formatNumber } from "../../helpers";
import UserHeader from "../../components/UserHeader";
import BlockPopup from "../../components/BlockPopup";
import "./styles.css";

const Training = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null); // Сохраняем выбранный модуль
    const navigate = useNavigate();

    // Открываем попап для неактивных карточек
    const handleCardClick = (module) => {
        if (!module.isActive) {
            setPopupOpen(true);
        } else {
            setSelectedModule(module); // При клике на активную карточку переходим к урокам
        }
    };

    // Возврат к списку модулей
    const handleGoBack = () => {
        if (selectedModule) {
            setSelectedModule(null); // Сбрасываем выбранный модуль
        } else {
            navigate(-1); // Если модуль не выбран — возвращаемся назад
        }
    };

    // Данные для отображения — либо модули, либо уроки
    const isLessonView = !!selectedModule;
    const data = isLessonView ? mockLessons : mockModules;

    return (
        <div className="home-container">
            <UserHeader user={mockUser} />

            <div className="home-main-content">
                <div className="training-title-block">
                    <div className="training-back-button" onClick={handleGoBack}>
                        <img src="./icons/arrow-left.svg" alt="Left arrow" />
                    </div>
                    <h2 className="home-tab-title">
                        {isLessonView ? "Выберите урок" : "Выберите модуль"}
                    </h2>
                </div>

                <div className="modules-container">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className={`module-card ${item.isActive ? 'active' : 'inactive'}`}
                            style={{
                                backgroundImage: `url(${item.background})`,
                                filter: item.isActive ? 'none' : 'grayscale(100%)',
                                cursor: !item.isActive ? 'pointer' : 'default',
                            }}
                            onClick={() => handleCardClick(item)}
                        >
                            {isLessonView ?
                                <>
                                    <div className="module-label-block">
                                        {item.isPractical ? (
                                            <label className="label-fiat">
                                                <img src="./icons/practice.svg" alt="Practical" />
                                                <p>Практическое задание</p>
                                            </label>
                                        ) : (
                                            <>
                                                <label className="label-lesson">
                                                    <img src="./icons/video-cam.svg" alt="Videocamera" />
                                                    <p>{item.name}</p>
                                                </label>
                                                <label className="label-lesson">
                                                    <img src="./icons/hat.svg" alt="Study" />
                                                    <p>Теория</p>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                    <h4 className="module-title">{item.title}</h4>
                                </>
                                : <>
                                    <p className="module-name">{item.name}</p>
                                    <h4 className="module-title">{item.title}</h4>
                                    <div className="module-label-block">
                                        <label className="label-fiat">
                                            <img src="./icons/label-fiat.svg" alt="Fiat icon" />
                                            <p>{formatNumber(item.price)} ₽</p>
                                        </label>
                                        <label className="label-token">
                                            <img src="./icons/label-token.svg" alt="Token icon" />
                                            <p>{formatNumber(item.tokens)} Т</p>
                                        </label>
                                    </div>
                                </>}
                        </div>
                    ))}
                </div>
            </div>

            <BlockPopup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                text={isLessonView ? "Уроки открываются поочередно," : "Модули открываются поочередно,"}
                subtext={isLessonView ? "изучите доступный урок что бы открыть следующий..." : "изучите доступный модуль что бы открыть следующий..."}
            />
        </div>
    );
};

export default Training;
