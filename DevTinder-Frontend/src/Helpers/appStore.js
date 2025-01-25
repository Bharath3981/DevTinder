import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import feedReducer from "./Slices/feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
