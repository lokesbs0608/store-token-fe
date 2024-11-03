import cookie from "js-cookie";
import { env } from "process";
type NextFunction = () => void;

// set in cookie
export const setCookie = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        cookie.set(key, value, {
            expires: 1,
        });
    }
};

// remove from cookie
export const removeCookie = (key: string) => {
    if (typeof window !== "undefined") {
        cookie.remove(key);
    }
};

// get from cookie such as stored token
// will be useful when we need to make request to server with auth token
export const getCookie = (key: string): string | undefined => {
    return getCookieFromBrowser(key);
};

export const getCookieFromBrowser = (key: string) => {
    return cookie.get(key);
};

export const getCookieFromServer = (
    key: string,
    req: { headers: { cookie?: string } }
): string | undefined => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const token = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith(`${key}=`));
    if (!token) {
        return undefined;
    }
    const tokenValue = token.split("=")[1];
    return tokenValue;
};

// set in localstoarge
export const setLocalStorage = (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
// get from localstorage
export const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) || "");
        } else {
            return false;
        }
    }
};
// remove from localstorage
export const removeLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (
    response: { accessToken: string },
    next: NextFunction
) => {
    setCookie("accessToken", response?.accessToken);
    setLocalStorage("accessToken", response?.accessToken);
    next();
};

// access user info from localstorage
export const isAuth = () => {
    if (typeof window !== "undefined") {
        const cookieChecked = getCookie("accessToken");
        const isLoggedInYN = getCookie("isLoggedInYN");
        if (cookieChecked && isLoggedInYN === 'true') {
            return true;
        } else {
            logout();
            return false;
        }
    }
};

export const logout = () => {
    removeCookie("accessToken");
    removeLocalStorage("accessToken");
};

export const updateUser = (user: string, next: NextFunction) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("user")) {
            let auth = JSON.parse(localStorage.getItem("user") || "");
            auth = user;
            localStorage.setItem("user", JSON.stringify(auth));
            next();
        }
    }
};


export const getBaseUrl = (caseType: string): string => {
    switch (caseType) {
        case 'common':
            return env.NEXT_COMMON_BASE_URL || 'http://localhost:5000/api/';
        case 'user':
            return 'https://user.example.com';
        case 'admin':
            return 'https://admin.example.com';
        case 'api':
            return 'https://api.example.com';
        default:
            return env.NEXT_COMMON_BASE_URL || 'http://localhost:5000/api/';
    }
};
