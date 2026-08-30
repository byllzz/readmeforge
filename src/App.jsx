import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./components/landing/LandingPage";
import LoginScreen from "./components/pages/LoginScreen";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import NotFound from "./components/pages/NotFound";
import useReadme from "./store/useReadme.js";

const USER_ID_KEY = "readmeforge_user_id";
const USER_NAME_KEY = "readmeforge_user_name";
const ACTIVE_USER_ID_KEY = "readmeforge_active_user_id"; // <-- fixed name
const USER_EMAIL_KEY = "readmeforge_user_email";
const LOGGED_IN_KEY = "readmeforge_logged_in";
const DEFAULT_EMAIL = "demo@gmail.com";

function generateUserId() {
  if (window.crypto && window.crypto.randomUUID)
    return window.crypto.randomUUID();
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function nameFromEmail(email) {
  const local = (email || "").split("@")[0] || "Guest";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

function resolveIdentity(email) {
  let storedId = localStorage.getItem(USER_ID_KEY);
  if (!storedId) {
    storedId = generateUserId();
    localStorage.setItem(USER_ID_KEY, storedId);
  }
  const resolvedEmail =
    email || localStorage.getItem(USER_EMAIL_KEY) || DEFAULT_EMAIL;
  const resolvedName = nameFromEmail(resolvedEmail);
  localStorage.setItem(USER_EMAIL_KEY, resolvedEmail);
  localStorage.setItem(USER_NAME_KEY, resolvedName);
  if (localStorage.getItem(ACTIVE_USER_ID_KEY) !== storedId) {
    localStorage.setItem(ACTIVE_USER_ID_KEY, storedId);
  }
  return { userId: storedId, userName: resolvedName, userEmail: resolvedEmail };
}

function isLoggedIn() {
  return localStorage.getItem(LOGGED_IN_KEY) === "true";
}

function wipeIdentity() {
  const uid = localStorage.getItem(USER_ID_KEY);
  if (uid) localStorage.removeItem(`readmeforge:${uid}:blocks`);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(ACTIVE_USER_ID_KEY);
  localStorage.removeItem(LOGGED_IN_KEY);
  useReadme.getState().clearAllData();
  useReadme.getState().resetToInitialTemplate();
}

function AuthFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState("login");
  const [pendingEmail, setPendingEmail] = useState(null);

  if (isLoggedIn()) return <Navigate to="/dashboard" replace />;

  if (step === "toDashboard") {
    return (
      <LoadingSpinner
        onComplete={() => {
          resolveIdentity(pendingEmail);
          localStorage.setItem(LOGGED_IN_KEY, "true");
          navigate("/dashboard", { replace: true });
        }}
      />
    );
  }

  if (step === "login") {
    return (
      <LoginScreen
        onLogin={(email) => {
          setPendingEmail(email);
          setStep("toDashboard");
        }}
        onBack={() => {}}
      />
    );
  }

  return null;
}

function Dashboard() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [identity] = useState(() => (isLoggedIn() ? resolveIdentity() : null));

  if (!isLoggedIn()) return <Navigate to="/" replace />;

  if (loggingOut) {
    return (
      <LoadingSpinner
        onComplete={() => {
          wipeIdentity();
          navigate("/", { replace: true });
        }}
      />
    );
  }

  return (
    <Home
      userId={identity.userId}
      userName={identity.userName}
      userEmail={identity.userEmail}
      onLogout={() => setLoggingOut(true)}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthFlow />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
