import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import LandingPage from './components/pages/LandingPage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import SimpleSpinner from './components/ui/SimpleSpinner';

const ACTIVE_EMAIL_KEY = 'readmeforge_activeEmail';
const FIRST_LOGIN_KEY = 'readmeforge_hasLoggedInBefore';

function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFancySpinner, setShowFancySpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem(ACTIVE_EMAIL_KEY);
    setLoggedIn(!!email);
  }, []);

  const handleLogin = (email) => {
    // Save email and workspace
    localStorage.setItem(ACTIVE_EMAIL_KEY, email);
    const workspaceKey = `readmeforge:${email}:blocks`;
    if (!localStorage.getItem(workspaceKey)) {
      localStorage.setItem(workspaceKey, JSON.stringify([]));
    }

    // Check if this is the first login ever
    const hasLoggedBefore = localStorage.getItem(FIRST_LOGIN_KEY);
    if (!hasLoggedBefore) {
      // First login: show the full animated spinner
      localStorage.setItem(FIRST_LOGIN_KEY, 'true');
      setShowFancySpinner(true);
      setIsTransitioning(true);

      setTimeout(() => {
        setLoggedIn(true);
        setIsTransitioning(false);
        setShowFancySpinner(false);
        navigate('/app');
      }, 5500); // full experience
    } else {
      // Returning user: show simple circle spinner briefly
      setShowFancySpinner(false);
      setIsTransitioning(true);

      setTimeout(() => {
        setLoggedIn(true);
        setIsTransitioning(false);
        navigate('/app');
      }, 1000); // quick transition
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_EMAIL_KEY);
    setLoggedIn(false);
    navigate('/');
  };

  // Render the appropriate spinner while transitioning
  if (isTransitioning) {
    return showFancySpinner ? <LoadingSpinner /> : <SimpleSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/app" replace />
          ) : (
            <LandingPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/app"
        element={
          !loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Home onLogout={handleLogout} />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
