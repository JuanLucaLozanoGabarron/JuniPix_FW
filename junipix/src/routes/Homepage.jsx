import "./style/homepage.css";
import Header from "../components/Header";

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
            <button>
              <p>Create your own artpiece</p>
            </button>
          </div>
        </div>
        <div className="collage"></div>
      </div>
    </div>
  );
}

export default App;
