import cookie from 'js-cookie';

const to_ken = "token";
const userName = "username";

export function getToken() {
    return cookie.get(to_ken) || false;
}

export function setToken(token) {
    return cookie.set(to_ken, token);
}

export function removeToken() {
    cookie.remove(userName);
    cookie.remove(to_ken);
}

export function setUsername(username) {
    return cookie.set(userName, username);
}

export function getUsername() {
    return cookie.get(userName);
}