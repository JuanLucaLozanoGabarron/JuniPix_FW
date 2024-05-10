import "./style/homepage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function App() {
  return (
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
              </button>
            </Link>
          </div>
        </div>
        <div className="collage"></div>
      </div>
    </div>
  );
}

export default App;
