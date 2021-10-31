const serverReducer = (state = true, action) => {
    switch (action.type) {
        case "NO_CONNEXION":
            return false
        default:
            return state;
    }
}

export default serverReducer;