import React, { useState } from "react";
import "./styles.css";

const SelectContent = ({ options, defaultSelected, onSelect, title }) => {
    const [selected, setSelected] = useState(defaultSelected || options[0].value);

    const handleSelect = (value) => {
        setSelected(value);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <div className="drawer-select-content">
            <p className="drawer-select-content-title">{title}</p>
            <ul className="drawer-select-content-options">
                {options.map((option) => (
                    <li
                        key={option.value}
                        className={`drawer-select-content-option ${selected === option.value ? "selected" : ""}`}
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.label}
                        {selected === option.value && <img className="drawer-select-content-checkmark" src="./icons/selected.svg" alt="Checkmark" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectContent;
