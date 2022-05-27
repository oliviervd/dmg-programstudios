// index.js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import './index.css';
import './modals.css';
import './svg.css';
import './glossary.css';

// import pages
import Landing from "./components/pages/landing";
import Home from "./components/pages/home";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="home" element={<Home />}/>
            <Route path="model1" element={<App />}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);