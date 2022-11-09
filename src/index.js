// index.js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';
import './modals.css';
import './svg.css';
import './glossary.css';

// import pages
import App from "./App";
import Landing from "./components/pages/landing";
import Home from "./components/pages/home";
import Glossary from "./components/pages/Glossary";
import ReadingList from "./components/pages/ReadingList";
import M02_C01 from "./components/contributions/M02_C01";

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

console.log(window.location.origin);

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
        >
            <Routes>
                <Route path="landing" element={<Landing/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="M01_C01" element={<App />}/>
                <Route path="M02_C01" element={<M02_C01/>}/>
                <Route path="glossary" element={<Glossary />}/>
                <Route path="reading-list" element={<ReadingList />}/>
            </Routes>
        </Auth0Provider>
    </BrowserRouter>,
    rootElement
);