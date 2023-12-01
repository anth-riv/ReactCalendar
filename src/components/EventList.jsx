import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteEvent, editEvent } from '../features/events/eventsSlice'; 

const EventList = () => {
  const events = useSelector(state => state.events.events);
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(id));
    }
  };

  const handleEdit = (event) => {
    setEditFormData(event);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent(editFormData));
    setIsEditing(false);
    setSelectedEvent(null);
  };

  return (
    <div className="text-center p-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Event List</h2>
      <ul className="flex flex-col items-center">
        {events.map(event => (
          <li key={event.id} className="flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3 transition duration-300 ease-in-out w-full md:w-3/4 lg:w-1/2 mx-auto">
            <span onClick={() => setSelectedEvent(event)} className="cursor-pointer truncate">{event.title}</span>
            <div>
              <button onClick={() => handleEdit(event)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-l mr-1">Edit</button>
              <button onClick={() => handleDelete(event.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-r">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedEvent && !isEditing && (
        <div className="event-details bg-gray-100 p-4 rounded-lg shadow mt-6 mx-auto w-full md:w-3/4 lg:w-1/2 overflow-hidden">
          <h3 className="text-xl font-semibold mb-2 truncate">{selectedEvent.title}</h3>
          <p className="mb-1 break-words"><strong>Date:</strong> {selectedEvent.date}</p>
          <p className="mb-1 break-words"><strong>Time:</strong> {selectedEvent.time}</p>
          <p className="break-words"><strong>Description:</strong> {selectedEvent.description}</p>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleEditSubmit} className="bg-gray-100 p-4 rounded-lg shadow mt-6 mx-auto w-full md:w-3/4 lg:w-1/2 overflow-hidden">
          <h3 className="text-xl font-semibold mb-2">Edit Event</h3>
          <input
            className="mb-2 p-2 w-full"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
          />
          <input
            className="mb-2 p-2 w-full"
            type="date"
            name="date"
            value={editFormData.date}
            onChange={handleEditChange}
          />
          <input
            className="mb-2 p-2 w-full"
            type="time"
            name="time"
            value={editFormData.time}
            onChange={handleEditChange}
          />
          <textarea
            className="mb-4 p-2 w-full"
            name="description"
            value={editFormData.description}
            onChange={handleEditChange}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded ml-2">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EventList;





