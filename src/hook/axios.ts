import axios, {AxiosInstance} from "axios";

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:4000/",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

const Axios = new Http().instance
export default Axios
