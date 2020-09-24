import React from "react";
import Routes from "./routes";
// import Navbar from "./components/Navbar";
import "./App.css";
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './components/Themes';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <Navbar /> */}
        <Routes history />
      </ThemeProvider>
    </div>
  );
}

export default App;
