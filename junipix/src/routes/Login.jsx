import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import "./style/login.css";
import LoginImage from "./images/login.jpeg";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (
          data.message === "Invalid credentials" ||
          data.message === "Error logging in user"
        ) {
          await Swal.fire({
            position: "center",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Connected succesfully",
          showConfirmButton: false,
          timer: 2000,
        });
        localStorage.setItem("id", data.id);
        navigate("/profile");
      });
  };

  return (
    <>
      <Header />
      <div className="loginPage">
        <div className="titleOfLogin">
          <hr />
          <h1>Login</h1>
          <hr />
        </div>
        <div className="infoLogin">
          <div className="formContact">
            <form onSubmit={handleSubmit}>
              <div className="info">
                <input
                  className="formInput"
                  id="mailLogin"
                  type="email"
                  placeholder="Email address"
                  value={inputs.email}
                  name="email"
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
              <input
                className="formInput"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <p id="account">
                Don't have an account yet?{" "}
                <Link to="/register" id="registerNow">
                  Register
                </Link>{" "}
                Now
              </p>
              <button id="button" type="submit" value="Send">
                <p>Log In</p>
              </button>
            </form>
          </div>
          <div className="image">
            <img id="large" src={LoginImage} alt="Login" />
          </div>
        </div>
      </div>
    </>
  );
}
