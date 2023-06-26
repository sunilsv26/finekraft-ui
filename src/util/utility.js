export const camelCaseToCapitalized = (str) => {
    const spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    const capitalizedStr = spacedStr.replace(/\b\w/g, (match) => match.toUpperCase());
    return capitalizedStr;
};

export const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};


export const getTypeoFValue = (val) => {
    let type = typeof val;
    if (type === 'string' && Date.parse(val)) {
        type = "date";
    }
    return type;
};