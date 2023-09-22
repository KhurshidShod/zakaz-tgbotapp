import axios from "axios";

const request = axios.create({
    baseURL: 'https://jumaniyozov.pythonanywhere.com/api/',
    timeout: 15000
})

export default request;