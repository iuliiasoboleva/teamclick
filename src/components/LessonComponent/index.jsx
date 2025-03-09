import React, { useRef, useState } from "react";
import "./styles.css";
import HomeworkComponent from "../HomeworkComponent";

const LessonComponent = ({ lesson, moduleName, onBack }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showHomework, setShowHomework] = useState(false);

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

    return (
        <div className="lesson-main-content">
            <div className="training-title-block">
                <div className="training-back-button" onClick={onBack}>
                    <img src="./icons/arrow-left.svg" alt="Left arrow" />
                </div>
            </div>
            <div className="lesson-cards">
                <div className="lesson-card">
                    <div className="module-label-block">
                        <label className="label-lesson">
                            <img src="./icons/book-open.svg" alt="Book opened" />
                            <p>{moduleName}</p>
                        </label>
                        <label className="label-lesson">
                            <img src="./icons/video-cam.svg" alt="Videocamera" />
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
                    <button className="link-card-more-button" onClick={handleShowHomework}
                    >
                        <img src="./icons/link-info.svg" alt="Link info" />
                        {showHomework ? "Скрыть задание" : "Перейти к заданию"}
                    </button>
                </div>
                {showHomework &&
                    <HomeworkComponent homework={lesson.homework} />
                }
            </div>
        </div>
    );
};

export default LessonComponent;
