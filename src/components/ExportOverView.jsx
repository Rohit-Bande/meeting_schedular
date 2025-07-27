import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

export default function ExportOverview() {
  const { schedule, attendance } = useSelector((s) => s.scheduler);

  const buildRows = () => {
    const rows = [];
    Object.entries(schedule).forEach(([d, arr]) => {
      arr.forEach((s) => {
        rows.push({
          date: d,
          student_name: s.student_name,
          class_name: s.class_name,
          age: s.age,
          meetingLink: s.meetingLink,
          attendanceStatus: attendance[d]?.[s.student_name],
        });
      });
    });
    return rows;
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(buildRows());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");
    XLSX.writeFile(wb, "schedule.xlsx");
  };

  return (
    <div className="auto-sceh-container">
      <button className="export-btn" onClick={exportExcel}>
        Export Summary
      </button>
    </div>
  );
}
