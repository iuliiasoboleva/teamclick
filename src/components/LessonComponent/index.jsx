import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockModules, mockLessons } from "../../mockData/moduleData";
import HomeworkComponent from "../HomeworkComponent";
import UserHeader from "../UserHeader";
import { mockUser } from "../../mockData/userData";
import "./styles.css";

const LessonComponent = ({ onBack }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { moduleId, lessonId } = useParams();
    const videoRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [showHomework, setShowHomework] = useState(false);

    const [module, setModule] = useState(location.state?.module || null);
    const [lesson, setLesson] = useState(location.state?.lesson || null);

    useEffect(() => {
        if (!module && moduleId) {
            const foundModule = mockModules.find((item) => item.id === parseInt(moduleId));
            if (foundModule) {
                if (!foundModule.isActive) {
                    console.warn(`Модуль с id ${moduleId} неактивен — редирект на список модулей`);
                    navigate("/training");
                    return;
                }
                setModule(foundModule);
            } else {
                console.warn(`Модуль с id ${moduleId} не найден — редирект на список модулей`);
                navigate("/training");
                return;
            }
        }

        if (!lesson && lessonId) {
            const foundLesson = mockLessons.find((item) => item.id === parseInt(lessonId));
            if (foundLesson) {
                if (!foundLesson.isActive) {
                    console.warn(`Урок с id ${lessonId} неактивен — редирект на модуль`);
                    navigate(`/training/module/${moduleId}`);
                    return;
                }
                setLesson(foundLesson);
            } else {
                console.warn(`Урок с id ${lessonId} не найден — редирект на модуль`);
                navigate(`/training/module/${moduleId}`);
                return;
            }
        }
    }, [moduleId, lessonId, module, lesson, navigate]);

    const handlePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleShowHomework = () => {
        setShowHomework(!showHomework);
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    if (!module || !lesson) {
        return <div>Данные не найдены</div>;
    }

    return (
        <div className="home-container">
            <UserHeader user={mockUser} />
            <div className="lesson-main-content">
                <div className="training-title-block">
                    <div className="training-back-button" onClick={onBack}>
                        <img src="/icons/arrow-left.svg" alt="Left arrow" />
                    </div>
                </div>

                <div className="lesson-cards">
                    <div className="lesson-card">
                        <div className="module-label-block">
                            <label className="label-lesson">
                                <img src="/icons/book-open.svg" alt="Book opened" />
                                <p>{module.name}</p>
                            </label>
                            <label className="label-lesson">
                                <img src="/icons/video-cam.svg" alt="Videocamera" />
                                <p>{lesson.name}</p>
                            </label>
                        </div>

                        <h4 className="lesson-title">{lesson.title}</h4>

                        {lesson.videoUrl && (
                            <div className="lesson-video-wrapper">
                                <video
                                    ref={videoRef}
                                    onClick={handlePlay}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    controls={false}
                                >
                                    <source src={lesson.videoUrl} type="video/mp4" />
                                    Ваш браузер не поддерживает видео.
                                </video>

                                {!isPlaying && (
                                    <button className="custom-play-button" onClick={handlePlay}>
                                        ▶
                                    </button>
                                )}
                            </div>
                        )}

                        {lesson.homework ? (
                            <button className="link-card-more-button" onClick={handleShowHomework}>
                                <img src="/icons/link-info.svg" alt="Link info" />
                                {showHomework ? "Скрыть задание" : "Перейти к заданию"}
                            </button>
                        ) : (
                            <div className="homework-placeholder">
                                Домашнее задание отсутствует
                            </div>
                        )}
                    </div>

                    {showHomework ? (
                        lesson.homework ? (
                            <HomeworkComponent homework={lesson.homework} />
                        ) : (
                            <div className="homework-placeholder">
                                Домашнее задание отсутствует
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default LessonComponent;
