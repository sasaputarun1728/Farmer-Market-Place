import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingItemIndex = state.findIndex(item => item.id === action.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          qty: updatedCart[existingItemIndex].qty + action.qty,
        };
        return updatedCart;
      } else {
        const newItem = {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
        };
        return [...state, newItem];
      }

    case "REMOVE":
      return state.filter(item => item.id !== action.id);

    case "INCREASE":
      return state.map(item =>
        item.id === action.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case "DECREASE":
      return state.map(item =>
        item.id === action.id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      );

    case "DROP":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage
  const initializeState = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [state, dispatch] = useReducer(reducer, [], initializeState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
