import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // Keep Home eagerly loaded for LCP
import "./index.css";

// Lazy load pages for code splitting
const BMW = lazy(() => import("./pages/BMW"));
const Audi = lazy(() => import("./pages/Audi"));
const Mercedes = lazy(() => import("./pages/Mercedes"));
const Lamborghini = lazy(() => import("./pages/Lamborghini"));
const Ferrari = lazy(() => import("./pages/Ferrari"));
const Tesla = lazy(() => import("./pages/Tesla"));
const SUV = lazy(() => import("./pages/SUV"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Page transition wrapper - optimized
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
      }, 200); // Reduced from 300ms for snappier feel
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

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <ScrollToTop />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Suspense fallback={<PageLoader />}>
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
              <Route
                path="/ferrari"
                element={<Ferrari darkMode={darkMode} />}
              />
              <Route path="/tesla" element={<Tesla darkMode={darkMode} />} />
              <Route path="/suv" element={<SUV darkMode={darkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route
                path="/contact"
                element={<Contact darkMode={darkMode} />}
              />
            </Routes>
          </PageWrapper>
        </Suspense>
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
