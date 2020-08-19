import cookie from 'js-cookie'

// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        })
    }
}

// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = next => {
    removeCookie('token');
    removeCookie('activity');
    removeLocalStorage('user');
    removeLocalStorage('activity');
    next();
};

// update user data in localstorage
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};

export const setActivityLocalStorage = (response, next) => {
    console.log('HELPER ON EDIT RESPONSE', response);
    if(getCookie('activity') || JSON.parse(localStorage.getItem('activity'))){
        removeLocalStorage('activity');
        removeCookie('activity');
    }
    setCookie('activity', response.data.activity);
    setLocalStorage('activity', response.data.activity);
    next();
};

export const setDeleteActivityLocalStorage = (response, next) => {
    console.log('HELPER ON DELETE RESPONSE', response);
    if (typeof response.data.activity !== 'undefined') {
        setCookie('activity', response.data.activity);
        setLocalStorage('activity', response.data.activity);
    }
    next();
};

export const activityId = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('activity');
        if (cookieChecked) {
            if (localStorage.getItem('activity')) {
                return JSON.parse(localStorage.getItem('activity'));
            } else {
                return false;
            }
        }
    }
};

export const updateActivity = (response, next) => {
    console.log('UPDATE ACTIVITY IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let activity = JSON.parse(localStorage.getItem('activity'));
        activity = response.data;
        localStorage.setItem('activity', JSON.stringify(activity));
    }
    next();
};

