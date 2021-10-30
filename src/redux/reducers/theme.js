import { getFromLS, setToLS } from "../../utils/storage";
import * as schemaThemes from "../../themes/schema.json";

let theme = getFromLS("theme");
const themes = getFromLS("all-themes") ?? schemaThemes.default;

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