import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDates } from "../redux state manager/meetingSlices";
import AddEventModal from "./AddEventModal";

const CalendarGrid = () => {
  const dispatch = useDispatch();
  const selectedDates = useSelector((state) => state.scheduler.selectedDates);
  const schedule = useSelector((state) => state.scheduler.schedule);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [activeModalDate, setActiveModalDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return [...Array(days)].map((_, i) => new Date(year, month, i + 1));
  };

  const handleSelect = (dateStr) => {
    const newSelected = selectedDates.includes(dateStr)
      ? selectedDates.filter((d) => d !== dateStr)
      : [...selectedDates, dateStr];
    dispatch(selectDates(newSelected));
  };

  const handleMonthChange = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h3>
          {monthName} {currentMonth.getFullYear()}
        </h3>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const dateStr = day.toISOString().split("T")[0];
          const isSelected = selectedDates.includes(dateStr);
          const events = schedule[dateStr] || [];

          return (
            <div
              key={dateStr}
              className={`calendar-cell ${isSelected ? "selected" : ""}`}
              onClick={() => {
                handleSelect(dateStr), setActiveModalDate(dateStr);
              }}
            >
              <div className="date-number">{day.getDate()}</div>
              <div className="event-list">
                {events.map((event, idx) => (
                  <div key={idx} className="event-item">
                    {event.student_name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {activeModalDate && (
        <AddEventModal
          date={activeModalDate}
          onClose={() => setActiveModalDate(null)}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
