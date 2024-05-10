import React from "react";
import { useState } from "react";
import LoginImage from "./images/login.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Header from "../components/Header";
import "./style/register.css";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5173/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(register),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.status == "Bad Request") {
          await Swal.fire({
            position: "top-end",
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            position: "center",
          });
          return;
        }
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The registration succeeded",
          showConfirmButton: false,
          timer: 2000,
          position: "center",
        });
        window.location.href = "/";
      });
  };
  return (
    <>
      <Header />
      <div className="registerPage">
        <div className="titleOfRegister">
          <hr />
          <h1>Register</h1>
          <hr />
        </div>
        <div className="infoRegister">
          <div className="formContact">
            <motion.div
              className="form"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.6 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="info">
                  <input
                    className="formInput"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={register.name}
                    onChange={(e) =>
                      setRegister((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                  <input
                    className="formInput"
                    id="mail"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={register.email}
                    onChange={(e) =>
                      setRegister((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <input
                  className="formInput"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={register.password}
                  onChange={(e) =>
                    setRegister((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
                <p id="account">
                  You have a account?{" "}
                  <Link to="/login" id="registerNow">
                    Log in{" "}
                  </Link>
                  Now
                </p>

                <button id="button" type="submit" value="Send">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ease: "easeOut", duration: 0.6, delay: 0.1 }}
                  >
                    <p>Sign In</p>
                  </motion.div>
                </button>
              </form>
            </motion.div>
          </div>
          <div className="image">
            <img id="large" src={LoginImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
