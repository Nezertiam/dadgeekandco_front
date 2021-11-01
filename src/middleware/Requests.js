import ApiHandler from "./api/ApiHandler";

const url = "http://localhost:5000/api";


// USERs
export const getUser = async () => {
    const response = await ApiHandler.get(`${url}/profile/me`);
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





// ARTICLES
export const getArticle = async (slug) => {
    const response = await ApiHandler.get(`${url}/article/${slug}`);
    return response;
}

export const postArticle = async (data) => {
    const response = await ApiHandler.post(`${url}/article`, data);
    return response;
}

export const putArticle = async (data, slug) => {
    const response = await ApiHandler.put(`${url}/article/${slug}`, data);
    return response;
}



const Requests = {
    getUser,
    login,

    getArticle,
    postArticle,
    putArticle,
}

export default Requests;