import axios from "axios";

const http = axios.create({
    baseURL: "https://controle-de-gastos-back-end.onrender.com",
    headers: {
        "Content-Type": "applications/json",
    },
});

export default http;