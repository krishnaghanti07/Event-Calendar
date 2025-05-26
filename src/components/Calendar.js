import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameDay } from 'date-fns';
import CalendarCell from './CalendarCell';

const Calendar = ({ events, onEdit, onDrop }) => {
  const today = new Date();
  const startDate = startOfWeek(startOfMonth(today));
  const endDate = endOfWeek(endOfMonth(today));
  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="calendar">
      {days.map((day, index) => (
        <CalendarCell
          key={index}
          day={day}
          events={events.filter(e => isSameDay(new Date(e.date), day))}
          onEdit={onEdit}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default Calendar;