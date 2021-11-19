const categoryReducer = (state = false, action) => {
    switch (action.type) {
        case "NEW_CATEGORY":
            return true;
        case "CATEGORY_CREATED":
            return false;
        default:
            return state;
    }
}

export default categoryReducer;