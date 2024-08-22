import React, { useState } from 'react';
import './../styles/Dropdown.css';

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleCategoryClick = (category) => {
        onCategoryChange(category);
        setIsOpen(false);
    };

    return (
        <div
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="dropdown-button">
                {selectedCategory || 'Select a category'}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {categories.map(category => (
                        <li
                            key={category}
                            className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryDropdown;
