import { useState, createContext, useContext, useEffect } from "react";
const BasketContext = createContext();
const useBasket = () => useContext(BasketContext);

const BasketProvider = ({ children }) => {
  const [basketSize, setBasketSize] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('basket')) localStorage.setItem('basket', JSON.stringify([]));
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) setBasketSize(basket.length);
  }, [])
  const getBasketList = () => {
    return JSON.parse(localStorage.getItem('basket'));
  }
  const addToBasket = (item) => {
    let randomKey = Math.random().toString(36).substring(7);
    item.key = randomKey;
    let basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) localStorage.setItem('basket', JSON.stringify([...basket, item]));
    setBasketSize((prev) => prev + 1);
  };
  const removeFromBasket = (item) => {
    let basket = JSON.parse(localStorage.getItem('basket'));
    const newBasket = basket.filter((el) => el.key !== item.key);
    setBasketSize(newBasket.length);
    localStorage.setItem('basket', JSON.stringify([...newBasket]));
  };
  return (
    <BasketContext.Provider value={{ addToBasket, removeFromBasket, basketSize, getBasketList }}>
      {children}
    </BasketContext.Provider>
  );
};

export { BasketProvider, useBasket };
