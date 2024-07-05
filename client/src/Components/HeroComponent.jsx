import React from "react";
import LoginImage from "../Assets/LoginImage.jpg";

const HeroComponent = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[80vh]"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight">
            Explore <span className="text-[#0C1844]"> Events</span> all around
            the world
          </h1>
          <p className="text-lg md:text-xl text-white  font-semibold mt-4">
            "Creating unforgettable experiences, one event at a time."
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
