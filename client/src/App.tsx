/* import logo from './logo.svg'; */
import './App.css';
import NavBar from './components/Navbar';
import Blog from './components/Blogs/Blogs';
import LandingPage from './components/LandingPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/blog" element={<Blog />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
