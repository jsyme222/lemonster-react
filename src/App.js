import { BrowserRouter } from "react-router-dom";

import AppBar from "./js/components/appbar/appbar";
import Routes from "./js/routes";

import "./css/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
