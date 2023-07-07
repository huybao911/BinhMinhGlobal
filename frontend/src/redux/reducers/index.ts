import { combineReducers } from "redux";
import admin from "./admin";
import user from "./user";

const rootReducer = combineReducers({
  admin,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
