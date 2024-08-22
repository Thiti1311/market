import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import './../styles/SearchInput.css';

const SearchInput = ({ onFilteredProducts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value || '';
        setSearchTerm(value);
        onFilteredProducts(value);
    };

    return (
        <div className="container-search">
            <CiSearch className="icon-search" />
            <input
                className='input-search'
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search..."
            />
        </div>

    );
};

export default SearchInput;
