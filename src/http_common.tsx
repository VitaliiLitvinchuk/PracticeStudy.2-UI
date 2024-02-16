import axios from "axios";

export const urlBackend = "http://localhost:5110/";

export const urlImages = urlBackend + "images/";

export const bearer = (token: string) => {
    return axios.create({
        baseURL: urlBackend,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    });
}

export default axios.create({
    baseURL: urlBackend,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});