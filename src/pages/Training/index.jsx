import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockUser } from "../../mockData/userData";
import { mockModules, mockLessons } from "../../mockData/moduleData";
import { formatNumber } from "../../helpers";
import UserHeader from "../../components/UserHeader";
import BlockPopup from "../../components/BlockPopup";
import LessonComponent from "../../components/LessonComponent";
import "./styles.css";

const Training = () => {
    const { moduleId, lessonId } = useParams();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (moduleId) {
            const module = mockModules.find((item) => item.id === parseInt(moduleId));
            if (module) {
                setSelectedModule(module);
            }
        } else {
            setSelectedModule(null);
        }

        if (lessonId && moduleId) {
            const lesson = mockLessons.find((item) => item.id === parseInt(lessonId));
            if (lesson) {
                setSelectedLesson(lesson);
            }
        } else {
            setSelectedLesson(null);
        }
    }, [moduleId, lessonId]);

    const handleCardClick = (item) => {
        if (!item.isActive) {
            setPopupOpen(true);
        } else if (selectedModule) {
            navigate(`/training/module/${selectedModule.id}/lesson/${item.id}`, {
                state: {
                    module: selectedModule,
                    lesson: item,
                },
            });
        } else {
            navigate(`/training/module/${item.id}`, {
                state: {
                    module: item,
                },
            });
        }
    };

    const handleGoBack = () => {
        if (selectedLesson) {
            navigate(`/training/module/${selectedModule?.id}`);
        } else if (selectedModule) {
            navigate(`/training`);
        } else {
            navigate(-1);
        }
    };

    const data = selectedModule ? mockLessons : mockModules;

    return (
        <div className="home-container">
            <UserHeader user={mockUser} />
            <div className="home-main-content">
                <div className="training-title-block">
                    <div className="training-back-button" onClick={handleGoBack}>
                        <img src="/icons/arrow-left.svg" alt="Left arrow" />
                    </div>
                    <h2 className="home-tab-title">
                        {selectedModule ? "Выберите урок" : "Выберите модуль"}
                    </h2>
                </div>

                <div className="modules-container">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className={`module-card ${item.isActive ? "active" : "inactive"}`}
                            style={{
                                backgroundImage: `url(${item.background})`,
                                filter: item.isActive ? "none" : "grayscale(100%)",
                                cursor: !item.isActive ? "pointer" : "default",
                            }}
                            onClick={() => handleCardClick(item)}
                        >
                            {selectedModule ? (
                                <>
                                    <div className="module-label-block">
                                        {item.isPractical ? (
                                            <label className="label-fiat">
                                                <img src="/icons/practice.svg" alt="Practical" />
                                                <p>Практическое задание</p>
                                            </label>
                                        ) : (
                                            <>
                                                <label className="label-lesson">
                                                    <img src="/icons/video-cam.svg" alt="Videocamera" />
                                                    <p>{item.name}</p>
                                                </label>
                                                <label className="label-lesson">
                                                    <img src="/icons/hat.svg" alt="Study" />
                                                    <p>Теория</p>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                    <h4 className="module-title">{item.title}</h4>
                                </>
                            ) : (
                                <>
                                    <p className="module-name">{item.name}</p>
                                    <h4 className="module-title">{item.title}</h4>
                                    <div className="module-label-block">
                                        <label className="label-fiat">
                                            <img src="/icons/label-fiat.svg" alt="Fiat icon" />
                                            <p>{formatNumber(item.price)} ₽</p>
                                        </label>
                                        <label className="label-token">
                                            <img src="/icons/label-token.svg" alt="Token icon" />
                                            <p>{formatNumber(item.tokens)} Т</p>
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <BlockPopup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                text={selectedModule
                    ? "Уроки открываются поочередно,"
                    : "Модули открываются поочередно,"
                }
                subtext={selectedModule
                    ? "изучите доступный урок, чтобы открыть следующий..."
                    : "изучите доступный модуль, чтобы открыть следующий..."
                }
            />
        </div>
    );
};

export default Training;
