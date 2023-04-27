import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const days = [];
  for (let i = 1; i <= daysInMonth(year, month); i++) {
    days.push(new Date(year, month, i));
  }

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth(year, month); i++) {
    blanks.push('');
  }

  const cells = blanks.concat(days);

  return (
    <div className="calendar">
      <h2>Calendar</h2>
      <div className="month">
        <div className="prev" onClick={() => setSelectedDate(new Date(year, month - 1, 1))}>
          &#10094;
        </div>
        <div className="next" onClick={() => setSelectedDate(new Date(year, month + 1, 1))}>
          &#10095;
        </div>
        <div className="month-name">{monthNames[month]} {year}</div>
      </div>
      <div className="weekdays">
        {weekdays.map((weekday) => (
          <div key={weekday} className="weekday">{weekday}</div>
        ))}
      </div>
      <div className="days">
        {cells.map((date, index) => (
          <div
            key={index}
            className={`day ${date.getMonth() !== month ? 'disabled' : ''} ${date.toDateString() === today.toDateString() ? 'today' : ''} ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
