import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import axios from "../axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(authToken);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      navigate("/login");
    }
    axios
      .post("/user/refresh-token", { refreshToken })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
      })
      .catch((error) => console.log(error));
  }
  
  useEffect(() => {
    axios
      .get("/todos/allTodos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.todos);
        setTodos(response.data.todos);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default Home;
