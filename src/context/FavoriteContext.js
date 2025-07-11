import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (item) => {
        const exists = favorites.find((fav) => fav.id === item.id);
        if (exists) {
            setFavorites(favorites.filter((fav) => fav.id !== item.id));
        } else {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter((item) => item.id !== id));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
