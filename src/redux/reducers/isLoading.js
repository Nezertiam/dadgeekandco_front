const loadingReducer = (state = true, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return true;
        case "UNSET_LOADING":
            return false;
        case "FIRST_CONNEXION":
            return false
        default:
            return state;
    }
}

export default loadingReducer;