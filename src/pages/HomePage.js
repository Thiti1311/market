import React, { useState, useEffect } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Filter from './../components/Filter';
import MainProducts from '../components/MainProducts';
import { getProducts } from './../services/MainProductsService';
import './../styles/HomePage.css';

const HomePage = () => {
    const [{ products, categories, colors }, setProducts] = useState({ products: [], categories: [], colors: [] });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [filteredColor, setFilteredColor] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts({ products: data.products, categories: data.categories, colors: data.colors });
            setFilteredCategory(data.products);
            setFilteredColor(data.products);
        };
    
        loadProducts();
    }, []);

    useEffect(() => {
        const filteredForCategory = selectedCategory 
            ? products.filter(product => product.categoria === selectedCategory)
            : products;
    
        const filteredForColor = selectedColor
            ? filteredForCategory.filter(product => product.cores.some(color => color.nome === selectedColor))
            : filteredForCategory;
    
        setFilteredCategory(filteredForCategory); 
        setFilteredColor(filteredForColor);
    }, [selectedCategory, selectedColor, products]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };    
    
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSearch = (filtered) => {
        setFilteredCategory(filtered);
    };

    return (
        <div>
            <Header products={products} onFilteredProducts={handleSearch} />
            <div className="header-line"></div>
            <main>
                <div className="container-title">
                    <h1>Shop Men's</h1>
                    <p className='subtitle'>Revamp your style with the latest designer trends in men’s clothing or achieve a perfectly curated wardrobe thanks to our line-up of timeless pieces.</p>
                </div>
            </main>
            <Filter 
                categories={categories} 
                colors={colors} 
                selectedCategory={selectedCategory} 
                selectedColor={selectedColor} 
                onCategoryChange={handleCategoryChange}
                onColorChange={handleColorChange} 
            />
            <MainProducts products={filteredCategory} />
            <Footer />
        </div>
    );
};

export default HomePage;
