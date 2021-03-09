import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlide";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
