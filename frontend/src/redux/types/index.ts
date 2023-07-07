import { IAdminState, AdminActions } from "./admin";
import { IUserState, UserActions } from "./user";

export type AppState = IAdminState | IUserState;
export type AppActions = AdminActions | UserActions;
 