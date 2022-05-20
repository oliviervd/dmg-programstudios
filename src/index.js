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
import Glossary from "./components/Glossary";
import EssayAlgoMuseum from "./components/essay/algoMuseum";
import Computational from "./components/models/model2_computational";
import Landing from "./components/pages/landing";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="model1" element={<App />}/>
            <Route path="glossary" element={<Glossary />}/>
            <Route path="essay/the-algorithmic-museum" element={<Computational />}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);