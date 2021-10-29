import jsonwebtoken from "jsonwebtoken";

export const isTokenExpired = (token) => {
    token = (token) ? token : localStorage.getItem('token');
    try {
        const { exp } = jsonwebtoken.decode(token);
        if (Date.now() >= exp * 1000) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return true;
    }
}

export default isTokenExpired;