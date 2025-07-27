import React, { useEffect, useState } from "react";
import "./App.css";
import ScheduleView from "./components/ScheduleView";
import ExportOverview from "./components/ExportOverview";
import { useDispatch } from "react-redux";
import CalendarGrid from "./components/CalendarGrid";
import {
  fetchStudents,
  scheduleMeetings,
} from "./redux state manager/meetingSlices";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <CalendarGrid />
      <div className="auto-sceh-container">
        <button
          className="auto-schedular-btn"
          onClick={() => dispatch(scheduleMeetings())}
        >
          Auto-Schedule
        </button>
      </div>

      <ScheduleView />
      <ExportOverview />
    </div>
  );
};

export default App;
