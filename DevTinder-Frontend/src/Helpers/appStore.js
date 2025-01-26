import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import feedReducer from "./Slices/feedSlice";
import connectReducer from "./Slices/connectionSlice";
import requestsReducer from "./Slices/requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectReducer,
    requests: requestsReducer,
  },
});

export default appStore;
