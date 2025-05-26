import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import { generateRecurringEvents } from './utils/recurrenceUtils';
import { format } from 'date-fns';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('calendar-events');
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const saveEvent = (e) => {
    const recurring = generateRecurringEvents(e);
    const withoutOld = events.filter(ev => ev.id !== e.id);
    setEvents([...withoutOld, ...recurring]);
    setFormOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => {
        setSelectedEvent(null);
        setFormOpen(true);
      }}>Add Event</button>

      <Calendar
        events={events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))}
        onEdit={e => { setSelectedEvent(e); setFormOpen(true); }}
        onDrop={(e, newDate) => {
          if (e.isInstance) return;
          setEvents(events.map(ev => ev.id === e.id ? { ...ev, date: format(newDate, 'yyyy-MM-dd') } : ev));
        }}
      />

      {formOpen && (
        <EventForm
          event={selectedEvent}
          onSave={saveEvent}
          onDelete={deleteEvent}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
};

export default App;