import { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar = () => {
    // State for the current month and year
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Get the month name based on currentMonth
    const getMonthName = (monthNumber) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthNumber];
    };

    // Handles clicking the 'Previous Month' button
    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Handles clicking the 'Next Month' button
    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Renders the individual days in the calendar
    const renderCalendarDays = () => {
        const days = [];
        let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust so that 0 corresponds to Monday
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const daysInPrevMonth = new Date(currentYear, prevMonth + 1, 0).getDate();
        const nextMonthDays = 42 - (firstDayOfMonth + daysInMonth); // Adjust 42 for total cells in the grid (6 rows)

        // Add days from the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({
                day: daysInPrevMonth - firstDayOfMonth + i + 1,
                isCurrentMonth: false
            });
        }

        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true
            });
        }

        // Add days from the next month
        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false
            });
        }

        // Map the days to JSX elements
        return days.map((dayInfo, index) => {
            const dayClassName = dayInfo.isCurrentMonth
                ? styles.calendarDay
                : `${styles.calendarDay} ${styles.inactiveDay}`;
            return (
                <div key={index} className={dayClassName}>
                    {dayInfo.day}
                </div>
            );
        });
    };

    // Renders the calendar header with the current month and year
    const renderCalendarHeader = () => {
        const monthName = getMonthName(currentMonth);
        return (
            <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{`${monthName} ${currentYear}`}</h2>
                <div>
                    <button className={`${styles.btn} p-1 md:p-2 lg:p-3`} onClick={handlePreviousMonth}>&lt;</button>
                    <button className={`${styles.btn} p-1 md:p-2 lg:p-3`} onClick={handleNextMonth}>&gt;</button>
                </div>
            </div>
        );
    };

      // Renders the weekdays row
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
        </div>
    );
};

export default Calendar;


