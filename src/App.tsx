//React
import { useEffect, useState } from "react";

//React-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import { Header } from "./components/header-footer/Header";
import { Footer } from "./components/header-footer/Footer";
import { Home } from "./components/home/Home";
import { Signin } from "./components/sign-in/Signin";

//Firebase
import { auth } from "./firebase-config";
import { User } from "firebase/auth";

//Toastify-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/admin/Dashboard";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(function () {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
