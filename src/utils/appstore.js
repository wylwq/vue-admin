import cookie from 'js-cookie';

const to_ken = "token";
const userName = "username";
const adminFlag = "adminFlag";

export function getToken() {
    return cookie.get(to_ken) || false;
}

export function setToken(token) {
    return cookie.set(to_ken, token);
}

export function removeToken() {
    cookie.remove(userName);
    cookie.remove(to_ken);
    cookie.remove(adminFlag);
}

export function setUsername(username) {
    return cookie.set(userName, username);
}

export function getUsername() {
    return cookie.get(userName);
}

export function setAdminFlag(adminflag) {
    return cookie.set(adminFlag, adminflag);
}

export function getAdminFlag() {
    return cookie.get(adminFlag);
}