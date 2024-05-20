import "./style/homepage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import GoAi from "./images/goAi.png";
import { Gallery } from "react-grid-gallery";

function App() {
  const images1 = [
    {
      src: "https://i.postimg.cc/5NnvLNyP/la-nuit-etoilee.jpg",
      width: 180,
      height: 190,
    },
    {
      src: "https://i.postimg.cc/ZYXXZ44M/michelangelo-buonarroti-100-v-gseapremiumxl.jpg",
      width: 290,
      height: 190,
    },
  ];
  const images2 = [
    {
      src: "https://i.postimg.cc/d37M60v8/Vincenzo-Camuccini-La-morte-di-Cesare-1-1024x581.jpg",
      width: 235,
      height: 190,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      width: 235,
      height: 190,
    },
  ];
  const images3 = [
    {
      src: "https://i.postimg.cc/5NnvLNyP/la-nuit-etoilee.jpg",
      width: 290,
      height: 190,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      width: 180,
      height: 190,
    },
  ];

  return (
    <div className="background">
      <div className="App">
        <Header />
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
      </div>
    </div>
  );
}

export default App;
