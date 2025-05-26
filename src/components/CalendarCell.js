import React from 'react';
import { useDrop } from 'react-dnd';
import { format } from 'date-fns';
import EventCard from './EventCard';

const CalendarCell = ({ day, events, onEdit, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'event',
    drop: (item) => onDrop(item, day),
    collect: monitor => ({ isOver: monitor.isOver() }),
  });

  return (
    <div ref={drop} className={`cell ${isOver ? 'over' : ''}`}>
      <div className="date">{format(day, 'd')}</div>
      {events.map((e, idx) => (
        <EventCard key={idx} event={e} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default CalendarCell;