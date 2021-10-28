// Dependencies
import { combineReducers } from "redux";

// Reducers
import loadingReducer from "./isLoading";
import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import userReducer from "./user";
import profileReducer from "./profile";


const reducers = combineReducers({
    isLoading: loadingReducer,
    isLogged: loggedReducer,
    counter: counterReducer,
    user: userReducer,
    profile: profileReducer
})

export default reducers;