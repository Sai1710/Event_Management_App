import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import HeroComponent from "../Components/HeroComponent";
import EventCard from "../Components/EventCard";
import AddEventDialog from "./AddEvent";
import axios from "axios";

function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkSessionStatus = () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setLoggedIn(checkSessionStatus);
  }, []);
  return (
    <div>
      <Navbar loggedIn={loggedIn} />

      <HeroComponent />
      <div className="m-9">
        <p className="font-bold text-4xl text-[#0C1844]">Latest Events</p>
        <EventCard />
      </div>
    </div>
  );
}

export default HomePage;
