import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';
import { LuBaggageClaim } from "react-icons/lu";
import { useBag } from '../contexts/BagContext';
import SearchInput from './../components/SearchInput';
import defaultImage from './../assets/images/image-default.png';

const Header = ({ products, onFilteredProducts }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { bagItems = [] } = useBag();

  const handleBagClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();

    const filtered = products.filter(product => {
      const title = product.titulo.toLowerCase().includes(term);
      const color = product.cores.filter(color => {
        return color.nome.toLowerCase().includes(term);
      });
      const category = product.categoria.toLowerCase().includes(term);
      const value = product.valor ? product.valor.toString().includes(term) : false;
      console.log('title || color || category || value:', title || color || category || value);
      
      return title || color.length > 0 || category || value;
    });

    console.log('Search Term:', filtered);

  
    onFilteredProducts(filtered);
  };

  const sumTotalValue = () => {
    if (!Array.isArray(bagItems)) return 0;

    const total = bagItems.reduce((sum, item) => {
      if (typeof item.valor === 'string') {
        const cleanValue = item.valor.replace(/[^0-9.]/g, '');
        const itemValue = parseFloat(cleanValue);
        return !isNaN(itemValue) ? sum + itemValue : sum;
      }
      return sum;
    }, 0);
    return total;
  };

  return (
    <header>
      <div className="left-side">
        <div className="main-text">
          <h1><Link to="/" className="logo-top">Market Project</Link></h1>
        </div>
        <nav>
          <ul>
            <li className="disabled"><Link to="/shop">Shop</Link></li>
            <li className="disabled"><Link to="/services">Stories</Link></li>
            <li><a href="https://www.linkedin.com/in/thiago-diniz-178bb9238/" target="_blank" rel="noopener noreferrer">About</a></li>
            <SearchInput onFilteredProducts={handleSearch} />
          </ul>
        </nav>
      </div>
      <div className="right-side">
        <button onClick={handleBagClick} className="bag">
          <LuBaggageClaim className="bag-icon" />
        </button>
        <p>{bagItems.length}</p>
        {isDropdownOpen && (
          <div className="bag-dropdown">
            {bagItems.length > 0 ? (
              <ul>
                {bagItems.map(item => (
                  <li key={item.id}>
                    <img 
                      src={item.fotos.find(picture => picture.capa)?.url || item.fotos.find(picture => picture.url).url || defaultImage} 
                      alt={item.titulo} 
                    />
                    <div className="details">
                      <div className="left-items">
                        <p className="title">{item.titulo}</p>
                        <p>{item.tamanho}</p>
                        <p>{item.cor}</p>
                      </div>
                      <div className="right-items">
                        <p>{item.valor}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">Your bag is empty.</p>
            )}
            <div className="header-line"></div>
            <div className="total-container">
              <p>Total: </p>
              <p>{`$${sumTotalValue().toFixed(2)}`}</p>
            </div>
            <Link className="button-center" to="/bag">
              <button className="view-bag-button">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
