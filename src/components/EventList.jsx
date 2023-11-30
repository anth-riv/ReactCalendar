import { useSelector } from 'react-redux';

const EventList = () => {
  const events = useSelector(state => state.events.events);

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
