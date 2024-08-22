import React from 'react';
import { useBag } from '../contexts/BagContext';
import Header from './../components/Header';
import Payment from '../components/Payment';
import './../styles/Bag.css';
import defaultImage from './../assets/images/image-default.png';
import { LuBaggageClaim } from "react-icons/lu";

const Bag = () => {
  const { bagItems, removeFromBag } = useBag();

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
    <div>
      <Header />
      <div className="bag-container">
        <div className="bag-items">
          <div className="title-bag">
            <LuBaggageClaim className="bag-icon" />
            <h1>Your Bag</h1>
          </div>
          {bagItems.length > 0 ? (
            <ul>
              {bagItems.map(item => (
                <li key={item.id} className="bag-item">
                  <img
                    src={item.fotos.find(picture => picture.capa)?.url || item.fotos.find(picture => picture.url).url || defaultImage}
                    alt={item.titulo}
                  />
                  <div className="bag-item-details">
                    <div className="bag-item-title">
                      <span>{item.titulo}</span>
                      <span>{item.valor}</span>
                    </div>
                    <div className="space-details">
                      <div className="bag-item-info">
                        <span key={item.tamanhos[0]} className="size-item">
                          {item.tamanhos[0]}
                        </span>
                        <div
                          className="description-color-view"
                          key={item.cores[0].codigo}
                          style={{ backgroundColor: item.cores[0].codigo }}
                        >
                        </div>
                      </div>
                      <div className="bag-item-remove" onClick={() => removeFromBag(item.id)}>Remove</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your bag is empty.</p>
          )}
        </div>
        <div className="bag-summary">
          <div className="value-to-pay">
            <h2>Total</h2>
            <p>{`$${sumTotalValue().toFixed(2)}`}</p>
          </div>
          <div className="header-line"></div>
          <div className="payment-container">
            <Payment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;