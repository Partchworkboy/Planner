import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ addEvent }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ eventName, startDate, endDate });
    setEventName('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <h1>Brea Planner</h1>
    <Calendar
        value={startDate}
        onChange={date => setStartDate(date)}
      />
    <form onSubmit={handleSubmit}>
    <h2>Add Event</h2>
      <div className="form-group">
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <br />
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <br />
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
