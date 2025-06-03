import Home from "./pages/Home/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Only redirect to '/' if user is on login page
        if (location.pathname === "/login") {
          navigate("/");
        }
      } else {
        // Only redirect to login if not already there
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer theme="dark" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
