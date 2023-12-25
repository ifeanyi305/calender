import React, { useState } from 'react';

const Calendar = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const renderSelectedDate = () => {
    if (selectedDate) {
      return (
        <h2>
          {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit'})}
        </h2>

      );
    } else {
      return (
        <h2>
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit'})}
        </h2>
      );
    }
  };

  const renderSelectedYear = () => {
    if (selectedDate) {
      return (
        <p>{selectedDate.toLocaleDateString('en-US', { year: 'numeric'})}</p>
      )
    } else {
      return (
        <p>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { year: 'numeric'})}</p>
      )
    }
  }

  const renderDays = () => {
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const totalDays = daysInMonth(currentMonth, currentYear);

    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate && selectedDate.getDate() === day;
      daysArray.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {daysArray}
      </div>
    );
  };

  return (
    <div className="Calendar_container">
      <div className="calendar">
        <div className="date_header">
          <p>{renderSelectedYear()}</p>
          <p>{renderSelectedDate()}</p>
        </div>
        <div className="container">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>&lt;</button>
            <h2>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</h2>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="calendar-days">
            <div className="day-label">Sun</div>
            <div className="day-label">Mon</div>
            <div className="day-label">Tue</div>
            <div className="day-label">Wed</div>
            <div className="day-label">Thu</div>
            <div className="day-label">Fri</div>
            <div className="day-label">Sat</div>
            {renderDays()}
          </div>
        </div>
      </div>
      <div className="bottom">
        <p>CLEAR</p>
        <p>CANCEL</p>
        <p>SET</p>
      </div>
    </div>
  );
};

export default Calendar;
