import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Header from "../components/Header";
import LoginImage from "./images/login.jpeg";
import "./style/register.css";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://junipix-api.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
        }
      );

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (response.status !== 201) {
        await Swal.fire({
          icon: "error",
          title: data.message || "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
          position: "center",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Registration succeeded",
        showConfirmButton: false,
        timer: 2000,
        position: "center",
      });
      window.location.href = "/login";
    } catch (error) {
      setLoading(false);
      await Swal.fire({
        icon: "error",
        title: "Network error",
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
        position: "center",
      });
    }
  };

  return (
    <>
      <div className="background"></div>
      <Header />
      <div className="registerPage">
        <div className="titleOfRegister">
          <hr />
          <h1>Register</h1>
          <hr />
        </div>
        <div className="infoRegister">
          <div className="formContact">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="info">
                  <input
                    className="formInput"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={register.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="formInput"
                    id="mail"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={register.email}
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  className="formInput"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={register.password}
                  onChange={handleInputChange}
                />
                <p id="account">
                  You have an account?{" "}
                  <Link to="/login" id="registerNow">
                    Log in{" "}
                  </Link>
                  Now
                </p>

                <button id="button" type="submit" disabled={loading}>
                  <div>
                    <p>{loading ? "Signing In..." : "Sign In"}</p>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="image">
            <img id="large" src={LoginImage} alt="Login" />
          </div>
        </div>
      </div>
    </>
  );
}
