import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editMeeting,
  deleteMeeting,
} from "../redux state manager/meetingSlices";
import AddEventModal from "./AddEventModal";

const EditableEventCard = ({ student, date }) => {
  const dispatch = useDispatch();
  const attendance = useSelector((s) => s.scheduler.attendance);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditSave = (updatedStudent) => {
    dispatch(
      editMeeting({
        date,
        studentName: student.student_name,
        updatedData: updatedStudent,
      })
    );
  };

  return (
    <span className="detail-container">
      <span className="event-card">
        <p>
          {student.student_name} — {student.class_name}, Age: {student.age}
        </p>
        <a href={student.meetingLink} target="_blank" rel="noopener noreferrer">
          Join Link
        </a>
        <p>
          Current Status:
          <strong>
            {attendance[date]?.[student.student_name] || "present"}
          </strong>
        </p>
        <div className="card-container">
          <button onClick={() => setShowEditModal(true)}>Edit</button>
          <button
            onClick={() =>
              dispatch(
                deleteMeeting({ date, studentName: student.student_name })
              )
            }
          >
            Delete
          </button>
        </div>

        {showEditModal && (
          <AddEventModal
            date={date}
            onClose={() => setShowEditModal(false)}
            initialData={student}
            onSave={handleEditSave}
          />
        )}
      </span>
    </span>
  );
};

export default EditableEventCard;
