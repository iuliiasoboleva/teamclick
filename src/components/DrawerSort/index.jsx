import React, { useState, useRef, useEffect } from "react";
import SelectContent from "../SelectContent";
import "./styles.css";

const DrawerSort = ({ isOpen, onClose, sortingOptions, selectedSort, setSelectedSort, title }) => {
    const drawerRef = useRef(null);
    const [startY, setStartY] = useState(null);

    const handleSelect = (value) => {
        setSelectedSort(value);
        onClose();
    };

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (!startY) return;
        const currentY = e.touches[0].clientY;
        if (currentY - startY > 50) {
            onClose();
        }
    };

    useEffect(() => {
        const drawer = drawerRef.current;
        if (drawer) {
            drawer.addEventListener("touchstart", handleTouchStart);
            drawer.addEventListener("touchmove", handleTouchMove);
        }
        return () => {
            if (drawer) {
                drawer.removeEventListener("touchstart", handleTouchStart);
                drawer.removeEventListener("touchmove", handleTouchMove);
            }
        };
    }, [startY]);

    return (
        <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div
                className={`drawer ${isOpen ? "open" : ""}`}
                ref={drawerRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="drawer-sort-line"></div>
                <SelectContent
                    options={sortingOptions}
                    defaultSelected={selectedSort}
                    onSelect={handleSelect}
                    title={title}
                />
            </div>
        </div>
    );
};

export default DrawerSort;
