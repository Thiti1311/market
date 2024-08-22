import React, { useState } from 'react';
import './../styles/Dropdown.css';

const ColorDropdown = ({ colors, selectedColor, onColorChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleColorClick = (color) => {
        onColorChange(color);
        setIsOpen(false);
    };

    return (
        <div
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="dropdown-button">
                <span
                    className="color-circle"
                    style={{ backgroundColor: selectedColor || '' }}
                />
                {selectedColor ? colors.find(c => c.codigo === selectedColor)?.nome : 'Select a color'}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {colors.map(color => (
                        <li
                            key={color.codigo}
                            className={`dropdown-item ${selectedColor === color.codigo ? 'selected' : ''}`}
                            onClick={() => handleColorClick(color.codigo)}
                        >
                            <span
                                className="color-circle"
                                style={{ backgroundColor: color.codigo }}
                            />
                            {color.nome}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ColorDropdown;
