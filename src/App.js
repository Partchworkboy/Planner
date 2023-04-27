import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import './App.css'
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
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

const App = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div>
      <h1>Brea Planner</h1>
      <div className="calendar-container">
        <Calendar
          value={new Date()}
          onChange={() => {}}
        />
      </div>
      <h2>Events</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event ${event.done ? 'done' : ''}`}
          >
            <h3>{event.eventName}</h3>
            <p>
              Start Date: {event.startDate.toDateString()}
            </p>
            <p>
              End Date: {event.endDate.toDateString()}
            </p>
            <div className="event-buttons">
              <label>
                <input
                  type="checkbox"
                  checked={event.done}
                  onChange={() => handleEventDoneToggle(index)}
                />
                Done
              </label>
              <button
                className="delete-button"
                onClick={() => handleEventDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <EventForm addEvent={addEvent} />
    </div>
  );
};

export default App;
