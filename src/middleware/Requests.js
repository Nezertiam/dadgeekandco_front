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
    if (response && response.data) {
        localStorage.setItem("token", response.data);
    }
}

export const getStream = async () => {
    const response = await ApiHandler.twitchGet("https://api.twitch.tv/kraken/streams/dadgeek_and_co");
    console.log(response);
}






const Requests = {
    getUser: getUser,
    login: login,
    getStream: getStream
}

export default Requests;