import NavBar from './components/Navbar/Navbar';
import BlogPage from './pages/BlogPage/BlogPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ResumePage from './pages/ResumePage/ResumePage';
import UnderConstruction from './pages/UnderConstructionPage/UnderConstruction';
import BlogContent from "./pages/BlogPage/BlogContent/BlogContent";
import ThreeDPrintingGallery from "./pages/threeDPrintingGalleryPage/ThreeDPrintingGallery";
import HardwareProjectsPage from "./pages/HardwareProjectsPage/HardwareProjectsPage";
import { AppContextProvider } from "./stores/AppContext";
import CodingProjectsPage from "./pages/CodingProjectsPage/CodingProjectsPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

interface IAppStateInterface {
    scrollY: number | null,
    scrolling: boolean | null,
    deltaScrollCalculation: {
        lastRecordedScrollY: number | null,
        deltaScrolled: number | null,
        timeIntervalCheckMiliseconds: number | null
    }
}

const RedirectToRoot = (props: { link: string }): React.ReactElement<{ link: string }> => {
    let navigate = useNavigate();

    React.useEffect(() => {
        navigate(props.link);
    }, [navigate, props.link]);

    return null;
}

function App() {
    const [appState, setAppState] = useState<IAppStateInterface>({
        scrollY: null,
        scrolling: null,
        deltaScrollCalculation: {
            lastRecordedScrollY: null,
            deltaScrolled: null,
            timeIntervalCheckMiliseconds: 10
        }
    });

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout = null;
        const timeToCheckScrollingHasStoppedMiliseconds =  50;

        const handleScroll = () => {
            clearTimeout(scrollTimeout); // Clear the timeout to reset the end-of-scroll detection

            setAppState(prevState => ({
                ...prevState,
                scrollY: window.scrollY,
                scrolling: true
            }));

            // Check if the user has stopped scrolling after a certain time
            scrollTimeout = setTimeout(() => {
                setAppState(prevState => ({
                    ...prevState,
                    scrolling: false
                }));
            }, timeToCheckScrollingHasStoppedMiliseconds);
        };

        // Add the event listener
        window.addEventListener("scroll", handleScroll);

        // Interval for calculating the delta scroll every timeIntervalCheckMiliseconds.
        const deltaScrollCalculationInterval: NodeJS.Timeout = setInterval(() => {
            setAppState(prevState => ({
                ...prevState,
                deltaScrollCalculation: {
                    ...prevState.deltaScrollCalculation,
                    lastRecordedScrollY: window.scrollY,
                    deltaScrolled: window.scrollY - Math.max(0, prevState.deltaScrollCalculation.lastRecordedScrollY)
                }
            }));
        }, appState.deltaScrollCalculation.timeIntervalCheckMiliseconds);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(scrollTimeout);
            window.clearInterval(deltaScrollCalculationInterval);
        };

    }, [appState.deltaScrollCalculation.timeIntervalCheckMiliseconds]);

    const deltaScrolled = appState.deltaScrollCalculation.deltaScrolled;

    return (
        <div className="App">
            <AppContextProvider>
            <BrowserRouter>
            <NavBar scrollStatus={{ scrolled: appState.scrollY, deltaScrolled: deltaScrolled }} />
            <div className="page-body">
            <Routes>
            <Route path="/" element={
                <LandingPage scrolled={appState.scrollY} scrolling={appState.scrolling} />
            } />
            <Route path="/digital_chronicles/blogs" element={<BlogPage showTopPicks={true} />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/projects/3d_printing" element={<ThreeDPrintingGallery />} />
            <Route path="/projects/hardware" element={<HardwareProjectsPage />} />
            <Route path="/projects/code" element={<CodingProjectsPage />} />
            <Route path="/digital_chronicles/blog" element={<BlogContent />} />
            <Route path="/user/login" element={<LogInPage />} />
            <Route path="/user/register" element={<RegisterPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<UnderConstruction />} />

            {/* Redirections */}
            <Route path="/digital_chronicles" element={<RedirectToRoot link="/digital_chronicles/blogs" />} />
            <Route path="/tools" element={<RedirectToRoot link="/tools/mood_tracker" />} />
            <Route path="/about" element={<RedirectToRoot link="/about/teddie" />} />
            </Routes>
            </div>
            </BrowserRouter>
            </AppContextProvider>
            </div>
    );
}

export default App;
