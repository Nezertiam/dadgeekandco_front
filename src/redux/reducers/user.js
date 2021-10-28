const userReducer = (state = null, action) => {
    switch (action.type) {
        case "CONNECT":
            return action.payload.user;
        case "DISCONNECT":
            return null;
        case "FIRST_CONNECION":
            return action.payload.user;
        default:
            return state;
    }
}

export default userReducer;