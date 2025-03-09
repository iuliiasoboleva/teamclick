import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonComponent from "../../components/LessonComponent";

const LessonPage = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();

    return (
        <LessonComponent onBack={() => navigate(`/training/module/${moduleId}`)} />
    );
};

export default LessonPage;
