const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "DISCONNECT":
            return false;
        default:
            return state;
    }
}

export default loggedReducer;