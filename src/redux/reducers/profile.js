const profileReducer = (state = null, action) => {
    switch (action.type) {
        case "CONNECT":
            return action.payload.profile;
        case "DISCONNECT":
            return null;
        case "FIRST_CONNECION":
            return action.payload.profile;
        default:
            return state;
    }
}

export default profileReducer;