import ApiHandler from "./api/ApiHandler";

const url = "http://192.168.0.24:5000/api";


// USERs
export const getUser = async () => {
    const response = await ApiHandler.get(`${url}/profile/me`);
    const data = {
        user: { ...response.data.user },
        profile: { ...response.data }
    };
    data.profile.user = response.data.user._id;

    const formatedResponse = {
        data,
        message: response.message,
        code: response.code
    }

    return formatedResponse;
}

export const login = async (email, password) => {
    const response = await ApiHandler.post(`${url}/security/auth`, { email, password });
    if (response && response.data) {
        localStorage.setItem("token", response.data);
    }
    return response;
}





// ARTICLES
export const getArticle = async (slug) => {
    const response = await ApiHandler.get(`${url}/article/${slug}`);
    return response;
}

export const getArticles = async (size = 3, page = 1, category = null) => {
    const uri = `${url}/article?size=${size}&page=${page}${category ? `&category=${category}` : ""}`
    const response = await ApiHandler.get(uri);
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


// Categories
export const getCategories = async () => {
    const response = await ApiHandler.get(`${url}/category`);
    return response;
}
export const postCategories = async (data) => {
    const response = await ApiHandler.post(`${url}/category`, data);
    return response;
}



const Requests = {
    getUser,
    login,

    getArticle,
    getArticles,
    postArticle,
    putArticle,

    getCategories,
    postCategories,
}

export default Requests;