export let setLocalStorage = (key, value) => {
    if (value && typeof (value) === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
    }
};

export let getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data); // converts a JSON string into a Javascript Object
    } catch (e) {
        return data;
    }
};

export let getToken = () => {
    return getLocalStorage('accesss_token');
};

/*export let getAuth = () => {
    return 
}*/