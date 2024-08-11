import axios from "axios";
import { default as jwtDecode } from "jwt-decode";

// Set the default base URL
axios.defaults.baseURL = "http://localhost:5000";

export default axios;
