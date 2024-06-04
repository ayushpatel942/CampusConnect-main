import axios from "axios";

export const BASE_URL = 'http://localhost:8080';

export const myAxios = axios.create({
    baseURL:BASE_URL
});

export const doLogin = (data) => {
    console.log(data);
    localStorage.setItem("loggedInUser",JSON.stringify(data));
};