import './App.css';
import Calendar from './Calendar';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEventForm = ({ addEvent }) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = e => {
    e.preventDefault();
    addEvent({ eventName, startDate, endDate });
    setEventName('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
     <div>
      <h1>Brea Planner</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="app-container">
        <div className="add-event-container">
          <h2>Add Event</h2>
          <AddEventForm addEvent={addEvent} />
        </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <br />
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <br />
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={date => setEndDate(date)}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

function EventList({ events, onToggle, onDelete }) {
  return (
    <div className="event-list-container">
      <table className="event-list">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.startDate.toLocaleDateString()}</td>
              <td>{event.endDate.toLocaleDateString()}</td>
              <td>
                <button onClick={() => onToggle(event.id)}>
                  {event.isDone ? "Undo" : "Done"}
                </button>
                <button onClick={() => onDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = event => {
    const newEvent = { ...event, id: Date.now(), isDone: false };
    setEvents([newEvent, ...events]);
  };

  const toggleEvent = id => {
    setEvents(
      events.map(event =>
        event.id === id ? { ...event, isDone: !event.isDone } : event
      )
    );
  };

  const deleteEvent = id => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <AddEventForm addEvent={addEvent} />
      <EventList events={events} onToggle={toggleEvent} onDelete={deleteEvent} />
      <footer>© 2023 breaplanner</footer>
    </div>
  );
}

export default App;
