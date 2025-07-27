export function allocateMeetings(students, selectedDates) {
  const sorted = [...students].sort((a, b) => b.age - a.age);
  const schedule = {};
  const attendance = {};
  selectedDates.forEach((d) => {
    schedule[d] = [];
    attendance[d] = {};
  });
  let idx = 0;
  sorted.forEach((s) => {
    for (let i = 0; i < s.meetings; i++) {
      const d = selectedDates[idx % selectedDates.length];
      const record = {
        ...s,
        meetingLink: `https://meet.com/${s.student_name.replace(/\s+/g, "_")}`,
        attendanceStatus: "present",
      };
      schedule[d].push(record);
      attendance[d][s.student_name] = "present";
      idx++;
    }
  });
  return { schedule, attendance };
}
