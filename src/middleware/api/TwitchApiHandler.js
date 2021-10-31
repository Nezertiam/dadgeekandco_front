const TWITCH_OAUTH_URL = "https://id.twitch.tv/oauth2/authorize";
const CLIENT_ID = "yi3vwvbemlvxfenhmptt563jfs4ryn";
const REDIRECT_URI = "http://localhost:3000/";
const RESPONSE_TYPE = "token";
const SCOPES = [
    "bits:read",
    "channel:read:hype_train",
    "channel:read:redemptions",
    "channel:read:subscriptions",
    "user:read:email"
].join(" ");


const encodeQueryString = (params) => {
    let items = [];
    for (let key in params) {
        let value = encodeURIComponent(params[key]);
        items.push(`${key}=${value}`);
    }
    return items.join("&");
}

const getUrlQueryStringParams = () => {
    const items = window.location.hash.slice(1).split("&");
    const params = {}

    for (let i in items) {
        let key = decodeURIComponent(items[i].split("=")[0]);
        let value = decodeURIComponent(items[i].split("=")[1]);
        params[key] = value
    }

    return params;
}


const makeGetJsonRequest = (url, params = null, headers = null) => {

    if (params) {
        url = `${url}?&${encodeQueryString(params)}`;
    }

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const responseJson = JSON.parse(xhr.responseText);
                    resolve(responseJson);
                } catch (error) {
                    reject(error);
                }
            }
        }

        xhr.onerror = reject;
        xhr.open("GET", url, true);

        if (headers) {
            for (let header in headers) {
                xhr.setRequestHeader(header, headers[header]);
            }
        }

        xhr.send();
    })
}



const twitchAuthentication = () => {
    const params = {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: RESPONSE_TYPE,
        scopes: SCOPES
    };
    window.location.href = `${TWITCH_OAUTH_URL}?${encodeQueryString(params)}`;
}

const isTwitchAuthenticated = () => {
    const params = getUrlQueryStringParams();
    if (params.access_token !== undefined) return true;
    return false;
}

const authenticateToTwitch = () => {
    if (!isTwitchAuthenticated()) {
        twitchAuthentication();
    }

    const params = getUrlQueryStringParams();


    makeGetJsonRequest("https://api.twitch.tv/", null, {
        "client-id": CLIENT_ID,
        "Authorization": `Bearer ${params.access_token}`
    })
}


export default authenticateToTwitch;