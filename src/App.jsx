import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import LandingPage from './components/pages/LandingPage';
import LoadingSpinner from './components/LoadingSpinner';   // adjust path if needed

const ACTIVE_EMAIL_KEY = 'readmeforge_activeEmail';

function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

    // Show loading spinner
    setIsTransitioning(true);

    // After a delay, move to the app
    setTimeout(() => {
      setLoggedIn(true);
      setIsTransitioning(false);
      navigate('/app');
    }, 5600);   // 5.58 seconds of beautiful loading
  };

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_EMAIL_KEY);
    setLoggedIn(false);
    navigate('/');
  };

  // If currently transitioning, show spinner over everything
  if (isTransitioning) {
    return <LoadingSpinner />;
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
