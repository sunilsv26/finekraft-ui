import { API_URL } from "../config/config";

export const getData = async (url) => {
    let apiUrl = url.includes("http") ? url : `${API_URL}${url}`;
    try {
        let response = await fetch(apiUrl);
        response = await response.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
};