import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5186/api"
})

export default api;