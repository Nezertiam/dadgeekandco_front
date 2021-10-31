// Dependencies
import { combineReducers } from "redux";

// Reducers
import loadingReducer from "./isLoading";
import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import userReducer from "./user";
import profileReducer from "./profile";
import themeReducer from "./theme";
import menuReducer from "./isMenuOpen"
import serverReducer from "./serverConnexion";

const reducers = combineReducers({
    isServerConnected: serverReducer,
    isLoading: loadingReducer,
    isLogged: loggedReducer,
    isOpen: menuReducer,
    counter: counterReducer,
    user: userReducer,
    profile: profileReducer,
    theme: themeReducer,
})

export default reducers;