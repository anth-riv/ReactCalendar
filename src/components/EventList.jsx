import { useSelector } from 'react-redux';
import { useState } from 'react';

const EventList = () => {
  const events = useSelector(state => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
      <div>
          <h2>Event List</h2>
          <ul>
              {events.map(event => (
                  <li key={event.id} onClick={() => setSelectedEvent(event)}>
                      {event.title}
                  </li>
              ))}
          </ul>
          {selectedEvent && (
              <div className="event-details">
                  <h3>{selectedEvent.title}</h3>
                  <p>Date: {selectedEvent.date}</p>
                  <p>Time: {selectedEvent.time}</p>
                  <p>Description: {selectedEvent.description}</p>
              </div>
          )}
      </div>
  );
};

export default EventList;
