import axios from "axios";

export default axios.create({
    // baseURL: "http://43.201.122.183", 
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
})