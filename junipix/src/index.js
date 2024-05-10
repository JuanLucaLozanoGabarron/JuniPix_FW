import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./routes/Homepage";
import Artwork from "./routes/Artwork";
import CreateAI from "./routes/CreateAI";
import Likes from "./routes/Likes";
import Gallery from "./routes/Gallery";
import reportWebVitals from "./reportWebVitals";
import Background from "./components/Background";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import
  url('https://fonts.googleapis.com/css2?family=Cinzel:wght@200..900&display=swap');
</style>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/artworks",
    element: <Artwork />,
  },
  {
    path: "/create-artworks",
    element: <CreateAI />,
  },
  {
    path: "/likes",
    element: <Likes />,
  },
  {
    path: "/gallery-1",
    element: <Gallery />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
