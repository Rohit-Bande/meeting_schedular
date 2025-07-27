### ✅ AddEventModal.js
- Reusable modal for **adding or editing** a student meeting.
- Pre-fills fields in **edit mode** using `initialData`.
- Fields:
  - `student_name`
  - `class_name`
  - `age`
  - `attendanceStatus` (`present`, `absent`, `late`)
- Auto-generates `meetingLink`.

---

### ✅ EditableEventCard.js
- Displays meeting info for a student on a specific date.
- **Edit**: Opens `AddEventModal` with data prefilled.
- **Delete**: Removes the student from that day.

---

### ✅ ScheduleView.js
- Displays **all meetings grouped by date**.
- Renders a block (`day-block`) for each date.
- Skips empty dates (no students scheduled).

---

### ✅ CalendarGrid.js
- Interactive monthly calendar.
- Click on a day to:
  - **Select/unselect** it.
  - **Open the AddEventModal** to schedule a student.
- Lists scheduled students inside the calendar cell.

---

### ✅ ExportOverview.js
- One-click **Excel export** of all scheduled meetings.
- Uses `XLSX` to generate `schedule.xlsx`.

---

### ✅ Redux: meetingSlices.js
- Handles global state:
  - `students`
  - `selectedDates`
  - `schedule`
  - `attendance`
- Actions:
  - `selectDates`
  - `scheduleMeetings`
  - `addMeeting`
  - `editMeeting`
  - `deleteMeeting`
- Async:
  - `fetchStudents` loads from `students.json`.

---

### ✅ Data: students.json
Initial list of students with:
```json
{
  "student_name": "Ananya Sharma",
  "class_name": "Mathematics",
  "meetings": 4,
  "age": 17,
  "instructor_name": "Mr. Verma"
}
