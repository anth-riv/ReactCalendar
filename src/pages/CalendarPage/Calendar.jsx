import { useState } from "react";
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import styles from "./Calendar.module.css";
import EventForm from "../../components/EventForm";
import EventList from "../../components/EventList";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Calendar = () => {
    // State for current month and year
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showEventForm, setShowEventForm] = useState(false); 

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getMonthName = (monthNumber) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthNumber];
    };

    // Function to handle 'Previous Month' button click
    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Function to handle 'Next Month' button click
    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const navigate = useNavigate();
    // Function to handle 'Add Event' button click
    const handleAddEvent = () => {
        navigate('/add-event');
    };

    // Fetching events from Redux
    const events = useSelector((state) => state.events.events);

    // Function to render each day in the calendar
    const renderCalendarDays = () => {
        const days = [];
        const today = new Date();
        let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust to make 0 correspond to Monday
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Adding days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({
                day: daysInMonth - firstDayOfMonth + i + 1,
                isCurrentMonth: false
            });
        }

        // Adding days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true
            });
        }

        // Adding days from next month
        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                day: i,
                isCurrentMonth: false
            });
        }

        return days.map((dayInfo, index) => {
            // Check if the day is today
            const isToday = dayInfo.isCurrentMonth && today.getDate() === dayInfo.day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

            // Deciding the CSS class for each day
            const dayClassName = dayInfo.isCurrentMonth
                ? styles.calendarDay
                : `${styles.calendarDay} ${styles.inactiveDay}`;

            // Finding events for the current day
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                const currentDate = new Date(currentYear, currentMonth, dayInfo.day);
                return eventDate.toDateString() === currentDate.toDateString() && dayInfo.isCurrentMonth;
            });

            // Additional style for highlighting the current day
            const todayClass = isToday ? "bg-green-200 font-bold" : "";

            return (
                <div key={index} className={`${dayClassName} flex flex-col ${todayClass}`}>
                    <div className={`date-number text-xs ${todayClass}`}>{dayInfo.day}</div> 
                    {dayEvents.map(event => (
                        <div key={event.id} 
                             className="event-item mt-auto flex items-start text-left text-xs bg-blue-100 text-blue-800 rounded px-1 py-1 m-1 overflow-hidden truncate max-w-[95%]"
                             data-tooltip-id="tooltip-calendar"
                             data-tooltip-content={event.title}>
                            <strong>{event.title}</strong>
                        </div>
                    ))}
                </div>
            );
        });
    };

    const renderCalendarHeader = () => {
        const monthName = getMonthName(currentMonth);
        return (
            <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{`${monthName} ${currentYear}`}</h2>
                <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handlePreviousMonth}>&lt;</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleNextMonth}>&gt;</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddEvent}>Add Event</button>
                </div>
            </div>
        );
    };

    const renderWeekDays = () => {
        return weekDays.map((dayName) => (
            <div key={dayName} className="text-center font-medium p-2">
                {dayName}
            </div>
        ));
    };

    return (
        <div className="container mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
            {renderCalendarHeader()}
            <div className="grid grid-cols-7 divide-x divide-gray-200">
                {renderWeekDays()}
                {renderCalendarDays()}
            </div>
            <div className="p-4">
                {showEventForm && <EventForm setShowEventForm={setShowEventForm} />}
                <ReactTooltip id="tooltip-calendar" />
                <EventList />
            </div>
        </div>
    );
};

export default Calendar;
