import { configureStore } from "@reduxjs/toolkit";
import schedulerReducer from "../redux state manager/meetingSlices";

const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export default store;
