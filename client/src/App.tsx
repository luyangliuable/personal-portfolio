/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/Navbar';
import Blog from './pages/BlogPage/Blogs';
import LandingPage from './pages/LandingPage/LandingPage';
import ResumePage from './pages/ResumePage/ResumePage';
import UnderConstruction from './pages/UnderConstructionPage/UnderConstruction';

import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

interface IAppStateInterface {
    scrolled: number | null,
    scrolling: boolean | null
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
                <NavBar scrollStatus={{
                    scrolled: appState.scrolled,
                    scrolling: appState.scrolling
                }
                } />
                <div className="page-body">
                    <Routes>
                        <Route path="/" element={
                            <LandingPage
                                scrolled={appState.scrolled}
                                scrolling={appState.scrolling}
                            />
                        }/>
                        <Route path="/blog" element={
                            <Blog />
                        }/>
                        <Route path="/resume" element={
                            <ResumePage />
                        }/>
                        <Route path="*" element={<UnderConstruction />} /> {/* Catch-all route */}
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    );
}

export default App;
