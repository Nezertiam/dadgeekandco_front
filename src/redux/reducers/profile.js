const profileReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_PROFILE":
            return action.payload;
        case "DISCONNECT":
            return null;
        default:
            return state;
    }
}

export default profileReducer;