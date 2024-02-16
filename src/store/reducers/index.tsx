import { combineReducers } from "redux";
import { authReducer } from "../../components/auth/reducer";
import { homePageReducer } from "../../components/HomePage/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homePageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;