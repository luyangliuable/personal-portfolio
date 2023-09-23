import './App.css';
import NavBar from './components/Navbar/Navbar';
import BlogPage from './pages/BlogPage/BlogPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ResumePage from './pages/ResumePage/ResumePage';
import UnderConstruction from './pages/UnderConstructionPage/UnderConstruction';
import BlogContent from "./pages/BlogPage/BlogContent/BlogContent";
import ThreeDPrintingGallery from "./pages/threeDPrintingGalleryPage/ThreeDPrintingGallery";
import HardwareProjectsPage from "./pages/HardwareProjectsPage/HardwareProjectsPage";
import CodingProjectsPage from "./pages/CodingProjectsPage/CodingProjectsPage";
import LogInPage from "./pages/LogInPage/LogInPage";

import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';

interface IAppStateInterface {
    scrolled: number | null,
    scrolling: boolean | null
}

const RedirectToRoot = (props: { link: string }): React.ReactElement<{ link: string }> => {
    let navigate = useNavigate();
    React.useEffect(() => {
        navigate(props.link);
    }, [navigate]);
    return null;
}

function App() {
    // Put any type for now because idk what the future will bring
    const [appState, setAppState] = useState<IAppStateInterface>({
        scrolled: null,
        scrolling: null
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            setAppState(({
                ...appState,
                scrolled: scrolled,
                scrolling: true
            }));
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        scrollTimeout = setInterval(() => {
            if (appState.scrolling === true) {
                setAppState(prevState => ({
                    ...prevState,
                    scrolling: false
                }));
            }
        }, 10);

        return () => {
            window.clearInterval(scrollTimeout);
        };
    }, [appState.scrolled]);

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar scrollStatus={{ scrolled: appState.scrolled, scrolling: appState.scrolling }} />
                <div className="page-body">
                    <Routes>
                        <Route path="/" element={<LandingPage scrolled={appState.scrolled} scrolling={appState.scrolling} />} />
                        <Route path="/digital_chronicles/blogs" element={<BlogPage />} />
                        <Route path="/resume" element={<ResumePage />} />
                        <Route path="/projects/3d_printing" element={<ThreeDPrintingGallery />} />
                        <Route path="/projects/hardware" element={<HardwareProjectsPage />} />
                        <Route path="/projects/code" element={<CodingProjectsPage />} />
                        <Route path="/digital_chronicles/blog" element={<BlogContent />} />
                        <Route path="/user/login" element={<LogInPage />} />

                        {/* Catch-all route */}
                        <Route path="*" element={<UnderConstruction />} />

                        {/* Redirections */}
                        <Route path="/digital_chronicles" element={<RedirectToRoot link="/digital_chronicles/blogs" />} />
                        <Route path="/tools" element={<RedirectToRoot link="/tools/mood_tracker" />} />
                        <Route path="/about" element={<RedirectToRoot link="/about/teddie" />} />
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    );
}

export default App;
