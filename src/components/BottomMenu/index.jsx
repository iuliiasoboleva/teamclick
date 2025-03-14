import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const BottomMenu = ({ items, onReset }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (path) => {
        if (location.pathname === path) {
            onReset?.();
        } else {
            navigate(path);
        }
    };

    return (
        <div className="bottom-menu">
            {items.map((item) => {
                const isActive =
                    item.path === "/"
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);

                return (
                    <div
                        key={item.id}
                        className="bottom-menu-item"
                        onClick={() => handleClick(item.path)}
                    >
                        <img
                            src={isActive ? item.icon.replace(".svg", "-active.svg") : item.icon}
                            alt={item.alt}
                        />
                        {item.label && <p className={isActive ? "active-text" : ""}>{item.label}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default BottomMenu;
