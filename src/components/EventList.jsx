import { useSelector } from 'react-redux';
import { useState } from 'react';

const EventList = () => {
  const events = useSelector(state => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
      <div className="text-center p-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Event List</h2>
          {/* Mapping over events to display each as a clickable list item */}
          <ul className="flex flex-col items-center">
              {events.map(event => (
                  <li key={event.id} 
                      onClick={() => setSelectedEvent(event)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 cursor-pointer transition duration-300 ease-in-out">
                      {event.title}
                  </li>
              ))}
          </ul>

          {/* Display event details if an event is selected */}
          {selectedEvent && (
              <div className="event-details bg-gray-100 p-4 rounded-lg shadow mt-6 mx-auto w-full md:w-3/4 lg:w-1/2 overflow-hidden">
                  <h3 className="text-xl font-semibold mb-2 truncate">{selectedEvent.title}</h3>
                  <p className="mb-1 break-words"><strong>Date:</strong> {selectedEvent.date}</p>
                  <p className="mb-1 break-words"><strong>Time:</strong> {selectedEvent.time}</p>
                  <p className="break-words"><strong>Description:</strong> {selectedEvent.description}</p>
              </div>
          )}
      </div>
  );
};

export default EventList;




