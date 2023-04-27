import './App.css';
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
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <br />
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={date => setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

function EventList({ events, onToggle, onDelete }) {
  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <label>
            <input
              type="checkbox"
              checked={event.isDone}
              onChange={() => onToggle(event.id)}
            />
            {event.name} - {event.startDate} to {event.endDate}
          </label>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
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


