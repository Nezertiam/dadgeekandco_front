import { getFromLS, setToLS } from "../../utils/storage";

let theme = getFromLS("theme");
const themes = getFromLS("all-themes");

theme = theme ?? themes.data.light;

const themeReducer = (state = { ...theme }, action) => {
    switch (action.type) {
        case "SET_THEME":
            setToLS("theme", action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default themeReducer;