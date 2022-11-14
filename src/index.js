// index.js
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './modals.css';
import './svg.css';
import './glossary.css';

// import pages
import Home from "./components/pages/home";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
    </BrowserRouter>,
    rootElement
);