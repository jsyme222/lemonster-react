import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import AppBar from "./js/components/appbar/appbar";
import Routes from "./js/routes";

import "./css/App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(55, 212, 55)",
    },
    secondary: {
      main: "rgb(109, 26, 67)",
    },
  },
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppBar />
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
