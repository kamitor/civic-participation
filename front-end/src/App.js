import React from "react";
import Routes from "./routes";
import "./App.css";
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './components/Themes';

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Routes history />
            </ThemeProvider>
        </div>
    );
}

export default App;
