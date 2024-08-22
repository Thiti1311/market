import React from 'react';
import './../styles/Filter.css';
import CategoryDropdown from './CategoryDropdown';
import ColorDropdown from './ColorDropdown';

const Filter = ({ categories, colors, selectedCategory, selectedColor, onCategoryChange, onColorChange }) => {

    const handleClearFilters = () => {
        onCategoryChange('');
        onColorChange('');
    };

    return (
        <form>
            <h2>Filters</h2>

            <div className="dropdown-container">
                <CategoryDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={onCategoryChange}
                />

                <ColorDropdown
                    colors={colors}
                    selectedColor={selectedColor}
                    onColorChange={onColorChange}
                />

                <button className="clear-filter" type="button" onClick={handleClearFilters}>
                    Clear Filters
                </button>
            </div>
        </form>
    );
};

export default Filter;
