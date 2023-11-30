import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../features/events/eventsSlice';

// eslint-disable-next-line react/prop-types
const EventForm = ({ setShowEventForm }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
            id: Date.now(),
            title,
            date,
            time,
            description
        };
        dispatch(addEvent(event));
        setShowEventForm(false);
    };

    const handleCancel = () => {
        setShowEventForm(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <br />
            <label>
                Hours:
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <br />
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default EventForm;

