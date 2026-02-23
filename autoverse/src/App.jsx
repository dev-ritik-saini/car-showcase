import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BMW from "./pages/BMW";
import Audi from "./pages/Audi";
import Mercedes from "./pages/Mercedes";
import Lamborghini from "./pages/Lamborghini";
import Ferrari from "./pages/Ferrari";
import Tesla from "./pages/Tesla";
import SUV from "./pages/SUV";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./index.css";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Page transition wrapper
const PageWrapper = ({ children, darkMode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");
  }, [location]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage("fadeIn");
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, children]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  );
};

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <ScrollToTop />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <PageWrapper darkMode={darkMode}>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/bmw" element={<BMW darkMode={darkMode} />} />
            <Route path="/audi" element={<Audi darkMode={darkMode} />} />
            <Route
              path="/mercedes"
              element={<Mercedes darkMode={darkMode} />}
            />
            <Route
              path="/lamborghini"
              element={<Lamborghini darkMode={darkMode} />}
            />
            <Route path="/ferrari" element={<Ferrari darkMode={darkMode} />} />
            <Route path="/tesla" element={<Tesla darkMode={darkMode} />} />
            <Route path="/suv" element={<SUV darkMode={darkMode} />} />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
