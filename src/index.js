// index.js
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


import './styles/index.css';
import './styles/typography.css'
import './styles/grids.css'
import './styles/colors.css'

// import pages
import Home from "./components/pages/home";
import ColorTagger from "./components/pages/ColorTagger";
import BlackHole from "./components/pages/BlackHole"
import StudioLanding from "./components/pages/StudioLanding"
import Index from "./components/pages/index"
import ObjectPage from "./components/pages/ObjectPage";
import AgentPage from "./components/pages/AgentPage";

const queryClient = new QueryClient()
const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/interfaces/color-tagger" element={<ColorTagger />}/>
                <Route path="/studio/:id" element={<StudioLanding />}/>
                <Route path="/index" element={<Index />} />
                <Route path="*" element={<BlackHole />} />
                <Route path="/index/object/:id" element={<ObjectPage />}></Route>
                <Route path="/index/agent/:id" element={<AgentPage/>}></Route>
            </Routes>
        </QueryClientProvider>
    </BrowserRouter>,
    rootElement
);