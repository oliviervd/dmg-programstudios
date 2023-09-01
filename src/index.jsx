// index.tsx
import { render } from "react-dom";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import {HelmetProvider} from "react-helmet-async"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import './styles/index.css';
import './styles/typography.css'
import './styles/grids.css'
import './styles/colors.css'
import './styles/layouts.css'
import './styles/studioDig.css'

// import pages
import Home from "./components/pages/home";
import StudioLanding from "./components/pages/StudioLanding"
import Index from "./components/pages"
import ObjectPage from "./components/pages/ObjectPage";
import AgentPage from "./components/pages/AgentPage";
import {Analytics} from "@vercel/analytics/react";
import StudioGraphicHome from "./components/pages/studios/StudioGraphic";
import CollectionPage from "./components/pages/CollectionPage";
import ExhibitionPage from "./components/pages/ExhibitionPage";

const queryClient = new QueryClient(
    {defaultOptions:
        {queries:
                {staleTime: Infinity} // set caching time to 24hours.
        }}
)


const rootElement = document.getElementById("root");
render(
    <>
        <BrowserRouter>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/studio/:id" element={<StudioLanding />}/>
                        <Route path="/index/:type" element={<Index />}/>
                        <Route path="/studio/graphic" element={<StudioGraphicHome />}/>
                        <Route path="/index/object/:id" element={<ObjectPage />}/>
                        <Route path="/index/agent/:id" element={<AgentPage/>}/>
                        <Route path="/index/collection/:collection" element={<CollectionPage/>}/>
                        <Route path="/index/exhibition/:id" element={<ExhibitionPage/>}/>
                    </Routes>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            </HelmetProvider>
        </BrowserRouter>
        <Analytics />
    </>,
    rootElement

);