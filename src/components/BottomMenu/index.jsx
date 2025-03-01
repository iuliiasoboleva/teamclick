import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const BottomMenu = ({ items }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="bottom-menu">
            {items.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                    <div
                        key={item.id}
                        className="bottom-menu-item"
                        onClick={() => navigate(item.path)}
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
