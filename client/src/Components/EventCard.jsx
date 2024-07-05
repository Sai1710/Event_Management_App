// src/components/EventCard.jsx
import React, { useState } from "react";
import LoginImage from "../Assets/LoginImage.jpg";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const EventCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={LoginImage} alt="Image" />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Holi Celebrations in Ahmedabad
        </h2>
        <div className="mt-2">
          <span className="text-sm font-medium text-white bg-[#0C1844] px-2 py-1 rounded">
            Festival
          </span>
        </div>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span className="ml-2 text-gray-600">Ahmedabad</span>
        </div>
        <div className="flex items-center mt-2">
          <FaCalendarAlt className="text-gray-500" />
          <span className="ml-2 text-gray-600">12-07-2024</span>
        </div>
        <div className="mt-4">
          <button
            className="flex items-center border-2 bg-[#0C1844] border-[#0C1844] justify-center rounded-md px-4 py-2"
            onClick={toggleDropdown}
          >
            {isOpen ? (
              <>
                <span className="text-white font-semibold">Hide Details</span>
                <FaChevronUp className="ml-2" color="white" />
              </>
            ) : (
              <>
                <span className="text-white font-semibold">View Details</span>
                <FaChevronDown className="ml-2" color="white" />
              </>
            )}
          </button>
          {isOpen && (
            <div className="mt-2 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                Join us for the vibrant Holi celebrations in Ahmedabad! Enjoy a
                day filled with colors, music, dance, and delicious food. It's a
                perfect event to experience the rich cultural heritage of India
                and create unforgettable memories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
