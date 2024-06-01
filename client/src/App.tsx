import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import { AppContextProvider } from "./stores/AppContext";
import loadable from '@loadable/component'
import SkeletonPage from './pages/SkeletonPage/SkeletonPage';
import Footer from './components/Footer/Footer';
import LlChatbot from './pages/Chatbot/Chatbot';
import { throttle } from './components/Utility/AnimationUtility';

import LandingPage from './pages/LandingPage/LandingPage';
import BlogPage from './pages/BlogPage/BlogPage';

import './App.css';

const createLoadableWithFallback: any = (importFunction: any) => {
    return loadable(importFunction, { fallback: <SkeletonPage /> });
}

/* const LandingPage = createLoadableWithFallback(() => import('./pages/LandingPage/LandingPage')); */
/* const BlogPage = createLoadableWithFallback(() => import('./pages/BlogPage/BlogPage')); */
const ResumePage = createLoadableWithFallback(() => import('./pages/ResumePage/ResumePage'));
const UnderConstruction = createLoadableWithFallback(() => import('./pages/UnderConstructionPage/UnderConstruction'));
const BlogContent = createLoadableWithFallback(() => import("./pages/BlogPage/BlogContent/BlogContent"));
const ThreeDPrintingGallery = createLoadableWithFallback(() => import("./pages/threeDPrintingGalleryPage/ThreeDPrintingGallery"));
const HardwareProjectsPage = createLoadableWithFallback(() => import("./pages/HardwareProjectsPage/HardwareProjectsPage"));
const CodingProjectsPage = createLoadableWithFallback(() => import("./pages/CodingProjectsPage/CodingProjectsPage"));
const LogInPage = createLoadableWithFallback(() => import("./pages/LogInPage/LogInPage"));
const RegisterPage = createLoadableWithFallback(() => import("./pages/RegisterPage/RegisterPage"));

interface IAppStateInterface {
    scrollY?: number,
    scrolling?: boolean,
    deltaScrollCalculation?: {
        lastRecordedScrollY: number,
        deltaScrolled: number,
    }
}

const RedirectToRoot = (props: { link: string }): React.ReactElement<{ link: string }> | null => {
    let navigate = useNavigate();

    React.useEffect(() => {
        navigate(props.link);
    }, [navigate, props.link]);

    return null;
}

function App() {
    const [appState, setAppState] = useState<IAppStateInterface>({});

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        const timeToCheckScrollingHasStoppedMiliseconds = 50;

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
        window.addEventListener("scroll", throttle(handleScroll, 20));

        // Interval for calculating the delta scroll every timeIntervalCheckMiliseconds.
        const deltaScrollCalculationInterval: NodeJS.Timeout = setInterval(() => {
            setAppState(prevState => {
                const deltaScrolled = window.scrollY - Math.max(0, prevState.deltaScrollCalculation?.lastRecordedScrollY ?? 0);
                if (prevState.deltaScrollCalculation?.deltaScrolled === deltaScrolled) return prevState;
                return {
                    ...prevState,
                    deltaScrollCalculation: {
                        ...prevState.deltaScrollCalculation,
                        lastRecordedScrollY: window.scrollY,
                        deltaScrolled: deltaScrolled
                    }
                }
            });
        }, 400);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(scrollTimeout);
            window.clearInterval(deltaScrollCalculationInterval);
        };
    }, []);

    const deltaScrolled = appState.deltaScrollCalculation?.deltaScrolled;

    return (
        <div className="App">
            <AppContextProvider>
                <BrowserRouter>
                    <NavBar scrollStatus={{ scrolled: appState.scrollY, deltaScrolled: deltaScrolled }} />
                    <Routes>
                        <Route path="/" element={
                            <LandingPage scrolled={appState.scrollY} scrolling={appState.scrolling} />
                        } />
                        <Route path="/digital_chronicles/blogs" element={<BlogPage showTopPicks={true} />} />
                        <Route path="/resume" element={<ResumePage />} />

                        <Route path="/projects/3d_printing" element={<ThreeDPrintingGallery />} />
                        <Route path="/projects/hardware" element={<HardwareProjectsPage />} />
                        <Route path="/projects/code" element={<CodingProjectsPage />} />
                        <Route path="/projects" element={<CodingProjectsPage />} />

                        <Route path="/tools/chatbot" element={<LlChatbot />} />
                        <Route path="/tools" element={<LlChatbot />} />

                        <Route path="/digital_chronicles/blog" element={<BlogContent scrolled={appState.scrollY} />} />

                        <Route path="/user/login" element={<LogInPage />} />
                        <Route path="/user/register" element={<RegisterPage />} />

                        {/* Catch-all route */}
                        <Route path="*" element={<UnderConstruction />} />

                        {/* Redirections */}
                        <Route path="/digital_chronicles" element={<RedirectToRoot link="/digital_chronicles/blogs" />} />
                        <Route path="/tools" element={<RedirectToRoot link="/tools/mood_tracker" />} />
                        <Route path="/about" element={<RedirectToRoot link="/about/teddie" />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AppContextProvider>
        </div>
    );
}

export default App;
