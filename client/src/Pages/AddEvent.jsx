// EventForm.jsx
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import Navbar from "../Components/Navbar";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const eventData = {
      eventName,
      eventLocation,
      startTime,
      endTime,
      category,
      image,
      description,
    };
    console.log("Form submitted with data:", eventData);
    // Add logic to send data to backend or perform other actions
  };

  return (
    <div>
      <Navbar />
      <div className="m-6">
        <div>
          <p className="font-bold text-xl text-[#0C1844] ml-1">Add Event</p>
        </div>
        <form className="flex flex-col justify-center mt-3">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Event Name"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Location"
          />
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Start Time"
          />
          <input
            type="datetime-local"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="End Time"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Category"
          />
          <textarea
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Description"
            rows={4}
          />
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none"
            placeholder="Poster"
          />
          <button className=" bg-[#0C1844] text-white rounded-md px-4 py-2 font-semibold shadow-md hover:shadow-none focus:outline-none">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
