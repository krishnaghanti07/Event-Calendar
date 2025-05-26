import { addDays, addWeeks, addMonths, format } from 'date-fns';

export const generateRecurringEvents = (event) => {
  const base = { ...event, isInstance: false };
  let list = [base];

  const addFn = {
    Daily: addDays,
    Weekly: (d, i) => addWeeks(d, i),
    Monthly: (d, i) => addMonths(d, i),
    Custom: (d, i) => addDays(d, i * (event.interval || 1))
  }[event.recurrence];

  if (!addFn || event.recurrence === 'None') return [base];

  for (let i = 1; i < 10; i++) {
    const next = addFn(new Date(event.date), i);
    list.push({ ...event, date: format(next, 'yyyy-MM-dd'), isInstance: true });
  }

  return list;
};
