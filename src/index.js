// index.js
import React, {Suspense} from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import './index.css';
import './modals.css';
import './svg.css';
import './glossary.css';

// import pages

const Glossary = React.lazy(() => import("./components/Glossary"))
const Computational = React.lazy(() => import("./components/models/model2_computational"))
const Landing = React.lazy(() => import("./components/pages/landing"))

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Suspense>
                <Route path="landing" element={<Landing/>}/>
                <Route path="/" element={<App />}/>
                <Route path="glossary" element={<Glossary />}/>
                <Route path="essay/the-algorithmic-museum" element={<Computational />}/>
            </Suspense>
        </Routes>
    </BrowserRouter>,
    rootElement
);