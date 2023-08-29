/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/Navbar/Navbar';
import BlogPage from './pages/BlogPage/BlogPage';
import LandingPage from './pages/LandingPage/LandingPage';
import ResumePage from './pages/ResumePage/ResumePage';
import UnderConstruction from './pages/UnderConstructionPage/UnderConstruction';
import BlogContent from "./pages/BlogPage/BlogContent/BlogContent";

import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes ,
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
                        <Route path="/blogs" element={
                            <BlogPage />
                        }/>
                        <Route path="/resume" element={
                            <ResumePage />
                        }/>
                        <Route path="/resume" element={
                            <ResumePage />
                        } />
                        <Route path="/blog" element={
                            <BlogContent />
                        } />
                        <Route path="*" element={<UnderConstruction />} /> {/* Catch-all route */}
                    </Routes>
                </div>

            </BrowserRouter>
        </div>
    );
}

export default App;
