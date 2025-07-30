// PremadeItemCard.js
import React from 'react';
// import { FaStar, FaHeart } from 'react-icons/fa';

const PremadeItemCard = ({ item }) => {
  return (
    <div className="rounded-lg bg-white shadow-md p-4 w-[200px]">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="rounded-lg w-full h-[180px] object-cover"
        />
        <FaHeart className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer" />
      </div>
      <div className="mt-3">
        <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-500 text-sm mr-1" />
          <span className="text-sm font-medium">{item.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default PremadeItemCard;
