import "./style/homepage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import GoAi from "./images/goAi.png";
import { Gallery } from "react-grid-gallery";
import Information from "../components/Information";

export default function App() {
  const images1 = [
    {
      src: "https://i.postimg.cc/NfsnYDnL/temp-Image-QFHUg-V.avif",
      width: 190,
      height: 190,
    },
    {
      src: "https://i.postimg.cc/5tC7pRXK/temp-Image-WXet-IZ.avif",
      width: 290,
      height: 190,
    },
  ];
  const images2 = [
    {
      src: "https://i.postimg.cc/VvYKfsD2/temp-Image-Xl-PCur.avif",
      width: 240,
      height: 190,
    },
    {
      src: "https://i.postimg.cc/XYTxZksf/temp-Imageqt9z-SJ.avif",
      width: 240,
      height: 190,
    },
  ];
  const images3 = [
    {
      src: "https://i.postimg.cc/85bb0QN4/temp-Imagea7-GXp-M.avif",
      width: 290,
      height: 190,
    },
    {
      src: "https://i.postimg.cc/X7qgQzhK/temp-Image-YQ1-GVv.avif",
      width: 190,
      height: 190,
    },
  ];

  return (
    <>
      <div className="background"></div>
      <Header />
      <div className="homepage">
        <div className="firstInfo">
          <div className="text">
            <div className="title">
              <h2>WELCOME TO</h2>
              <h1>JUNIPIX</h1>
            </div>
            <div className="createYourArtpiece">
              <Link to="/create-artworks">
                <button>
                  <p>Create your own artpiece</p>
                  <img src={GoAi} alt="" />
                </button>
              </Link>
            </div>
          </div>

          <div className="collage">
            <Gallery images={images1} />
            <Gallery images={images2} />
            <Gallery images={images3} />
          </div>
        </div>
        <Information />
      </div>
    </>
  );
}
