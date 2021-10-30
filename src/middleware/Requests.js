import ApiHandler from "./api/ApiHandler";

const url = "http://localhost:5000/api";

export const getUser = async () => {
    const response = await ApiHandler.get("http://localhost:5000/api/profile/me");
    const data = {
        user: { ...response.data.user },
        profile: { ...response.data }
    };
    data.profile.user = response.data.user._id;

    return data;
}

export const login = async (email, password) => {
    const response = await ApiHandler.post(`${url}/security/auth`, { email, password });
    if (response.data) localStorage.setItem("token", response.data);
}






const Requests = {
    getUser: getUser,
    login: login
}

export default Requests;