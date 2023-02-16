// index.js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/index.css';
import './styles/typography.css'
import './styles/grids.css'
import './styles/colors.css'

// import pages
import Home from "./components/pages/home";
import ColorTagger from "./components/pages/ColorTagger";
import BlackHole from "./components/pages/BlackHole"
import StudioLanding from "./components/pages/StudioLanding"

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/color-tagger" element={<ColorTagger />}/>
                <Route path="/studio/:id" element={<StudioLanding />}/>
                <Route path="*" element={<BlackHole />} />
            </Routes>
    </BrowserRouter>,
    rootElement
);