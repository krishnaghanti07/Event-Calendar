import React from 'react';
import { useDrag } from 'react-dnd';

const EventCard = ({ event, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: event,
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div ref={drag} className="event-card" style={{ opacity: isDragging ? 0.5 : 1 }} onClick={() => onEdit(event)}>
      {event.title}
    </div>
  );
};

export default EventCard;
