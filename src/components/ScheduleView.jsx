import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditableEventCard from "./EditableEventCard";
import AddEventModal from "./AddEventModal";

export default function ScheduleView() {
  const schedule = useSelector((s) => s.scheduler.schedule);
  const attendance = useSelector((s) => s.scheduler.attendance);
  const [openDate, setOpenDate] = useState(null);

  return (
    <>
      <div className="schedul-view-container">
        {Object.entries(schedule)
          .filter(([date, list]) => list.length > 0)
          .map(([date, list]) => (
            <div key={date} className="day-block">
              <h3>{date}</h3>
              {list.map((student) => (
                <EditableEventCard
                  key={`${date}-${student.student_name}`}
                  student={student}
                  date={date}
                />
              ))}
            </div>
          ))}
        {openDate && (
          <AddEventModal date={openDate} onClose={() => setOpenDate(null)} />
        )}
      </div>
      <hr />
    </>
  );
}
