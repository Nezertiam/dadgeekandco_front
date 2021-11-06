import _axios from "axios";
import * as dictionnary from "./responseDictionnary.json"

const dico = dictionnary.default;


// Private handlers

const axios = _axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: needsCredentials || true
});



/**
 * Generate initial headers config with token
 * 
 * @returns {object}
 */
const getInitialConfig = () => {
    const token = localStorage.getItem("token");
    const config = (token) ? {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "x-auth-token": token
        }
    } : {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    return config;
}

/**
 * Add token to custom headers
 * 
 * @param {Object} config 
 */
const mergeConfigs = (config = {}) => {
    const initialConfig = getInitialConfig();
    return { ...initialConfig, ...config };
}

/**
 * Builds the uri with environment url variable and path given
 * 
 * @param {String} path
 * @returns 
 */
const buildURI = (path) => {
    // const baseURL = process.env.API_URL;
    // const uri = baseURL + path;
    const uri = path;
    return uri;
}




const errorHandler = (error) => {
    const response = error.response ? error.response.data : {
        code: 503,
        status: "Service Unavailable",
        message: "No server connexion."
    };
    const message = dico[response.message];

    if (message) response.message = message;

    console.log(response);

    return response;
}





/**
 * Do a get request
 * 
 * @param {String} url 
 * @param {Object} config 
 * @returns 
 */
const get = async (path, config) => {
    const uri = buildURI(path);
    config = (config) ? mergeConfigs(config) : getInitialConfig();
    try {
        const response = await axios.get(uri, config);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return errorHandler(err)
    }
}

/**
 * Do a post request
 * 
 * @param {String} uri 
 * @param {Object} data
 * @param {Object} config 
 */
const post = async (path, data, config) => {
    const uri = buildURI(path);
    config = (config) ? mergeConfigs(config) : getInitialConfig();
    try {
        const response = await axios.post(uri, data, config);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return errorHandler(err);
    }
}


/**
 * Do a put request
 * 
 * @param {String} uri
 * @param {Object} data
 * @param {Object} config 
 */
const put = async (path, data, config) => {
    const uri = buildURI(path);
    config = (config) ? mergeConfigs(config) : getInitialConfig();
    try {
        const response = await axios.put(uri, data, config);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return errorHandler(err);

    }
}


/**
 * Do a delete request
 * 
 * @param {String} uri 
 * @param {Object} config 
 */
const remove = async (path, config) => {
    const uri = buildURI(path);
    config = (config) ? mergeConfigs(config) : getInitialConfig();
    try {
        const response = await axios.delete(uri, config);
        console.log(response.data);
        return response.data;
    } catch (err) {
        return errorHandler(err);

    }
}



const ApiHandler = {
    get: get,
    post: post,
    put: put,
    delete: remove
}

export default ApiHandler;