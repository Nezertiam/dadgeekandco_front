const userReducer = (state = null, action) => {
    switch (action.type) {
        case "CONNECT":
            return action.payload.user;
        case "DISCONNECT":
            return null;
        case "FIRST_CONNEXION":
            return action.payload.user;
        default:
            return state;
    }
}

export default userReducer;