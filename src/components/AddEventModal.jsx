import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeeting } from "../redux state manager/meetingSlices";

const AddEventModal = ({
  date,
  onClose,
  initialData = null,
  onSave = null,
}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    student_name: "",
    class_name: "",
    age: "",
    attendanceStatus: "present",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!form.student_name || !form.class_name || !form.age) return;

    const student = {
      ...form,
      age: Number(form.age),
      meetingLink: `https://meet.com/${form.student_name.replace(/\s+/g, "_")}`,
    };

    if (onSave) {
      onSave(student); // editing flow
    } else {
      dispatch(addMeeting({ date, student })); // adding flow
    }

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>
          {initialData ? "Edit Event" : "Add Event"}: {date}
        </h3>

        <input
          placeholder="Student Name"
          value={form.student_name}
          onChange={(e) => setForm({ ...form, student_name: e.target.value })}
        />
        <input
          placeholder="Class Name"
          value={form.class_name}
          onChange={(e) => setForm({ ...form, class_name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <select
          value={form.attendanceStatus}
          onChange={(e) =>
            setForm({ ...form, attendanceStatus: e.target.value })
          }
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>

        <div className="btn-container">
          <button onClick={handleSave}>{initialData ? "Update" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
