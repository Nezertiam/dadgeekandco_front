import ApiHandler from "./api/ApiHandler";

export const getUser = async () => {
    const response = await ApiHandler.get("http://localhost:5000/api/profile/me");
    const data = {
        user: { ...response.data.user },
        profile: { ...response.data }
    };
    data.profile.user = response.data.user._id;

    return data;
}

const Requests = {
    getUser: getUser
}

export default Requests;