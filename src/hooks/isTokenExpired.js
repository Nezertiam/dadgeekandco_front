import jsonwebtoken from "jsonwebtoken";

export const isTokenExpired = (token) => {
    token = (token) ? token : localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        jsonwebtoken.decode(token);
        const { exp } = jsonwebtoken.decode(refreshToken);
        if (Date.now() >= exp * 1000) {
            return false;
        }
    } catch (err) {
        return false;
    }
    return true;
}

export default isTokenExpired;