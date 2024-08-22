import React, { createContext, useState, useContext } from 'react';

const BagContext = createContext();

export const BagProvider = ({ children }) => {
    const [bagItems, setBagItems] = useState([]);

    const addToBag = (product) => {
        setBagItems([...bagItems, product]);
    };

    const removeFromBag = (productId) => {
        setBagItems(bagItems.filter(item => item.id !== productId));
    };

    const clearBag = () => {
        setBagItems([]);
    }

    return (
        <BagContext.Provider value={{ bagItems, addToBag, removeFromBag, clearBag }}>
            {children}
        </BagContext.Provider>
    );
};

export const useBag = () => useContext(BagContext);
