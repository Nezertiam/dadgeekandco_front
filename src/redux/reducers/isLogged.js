const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case "CONNECT":
            return true;
        case "DISCONNECT":
            return false;
        case "FIRST_CONNEXION":
            return true
        default:
            return state;
    }
}

export default loggedReducer;