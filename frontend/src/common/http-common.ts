import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        "Content-type": "application/json"
        // "Host": "localhost",
        // "Origin": "http://localhost:3000",
    }
})