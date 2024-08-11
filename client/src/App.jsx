import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import axios from "./axiosConfig.js";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const decodedToken = jwtDecode(authToken);
  const currentTime = Date.now() / 1000;

  if (!(authToken || refreshToken)) {
    setIsAuthenticated(false);
    window.location.href = "/login";
  }

  console.log(localStorage.getItem("authToken"));

  if (decodedToken.exp < currentTime) {
    axios
      .post("/user/refresh-token", { refreshToken })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
      })
      .catch((error) => console.log(error));
  }
  console.log("New Token");
  console.log(localStorage.getItem("authToken"));

  useEffect(() => {
    axios
      .get("/user/check-auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => setIsAuthenticated(response.data.authenticated))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
