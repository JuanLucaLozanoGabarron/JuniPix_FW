import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginImage from "./images/login.jpeg";
import Header from "../components/Header";
import Swal from "sweetalert2";
import "./style/profile.css";

export async function profileData() {
  const res = await fetch("https://junipix-api.onrender.com/profile", {});
  console.log(res);
  return await res.json();
}

export default function Profile() {
  const userData = useLoaderData();

  const logout = async () => {
    try {
      const response = await fetch(
        "https://junipix-api.onrender.com/logout",
        {}
      );
      const data = await response.json();

      if (data.message === "Disconnected") {
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
          position: "center",
        });
        localStorage.removeItem("id", data.id);
        localStorage.removeItem("name", data.name);
        localStorage.removeItem("email", data.email);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {userData.status === "Bad Request" ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <div className="background"></div>
          <Header />
          <div className="profilePage">
            <div className="titleOfProfile">
              <hr />
              <h1>Profile</h1> <hr />
            </div>
            <div className="infoProfile">
              <div className="infoProfileData">
                <p>Your Name: {localStorage.getItem("name")}</p>
                <p>Your Email: {localStorage.getItem("email")}</p>
                <button onClick={logout}>Logout</button>
              </div>
              <div className="image">
                <img id="large" src={LoginImage} alt="Login" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
