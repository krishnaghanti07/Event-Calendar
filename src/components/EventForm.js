import React, { useState, useEffect } from 'react';

const recurrenceOptions = ['None', 'Daily', 'Weekly', 'Monthly', 'Custom'];

const EventForm = ({ event, onSave, onDelete, onClose }) => {
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', recurrence: 'None', interval: 1 });

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="time" type="time" value={form.time} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="recurrence" value={form.recurrence} onChange={handleChange}>
        {recurrenceOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      {form.recurrence === 'Custom' && (
        <input name="interval" type="number" value={form.interval} onChange={handleChange} />
      )}
      <button onClick={() => onSave({ ...form, id: event?.id || Date.now() })}>Save</button>
      {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EventForm;