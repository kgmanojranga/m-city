//React
import { useEffect, useState } from "react";

//React-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import { Header } from "./components/header-footer";
import { Footer } from "./components/header-footer";
import { Home } from "./components/home";
import { Signin } from "./components/sign-in";

//Firebase
import { auth } from "./components/config/firebase-config";
import { User } from "firebase/auth";

//Toastify-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/admin/Dashboard";
import { AuthGuard } from "./hoc";

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
        <Route path="sign-in" element={<Signin user={user} />} />
        <Route
          path="dashboard"
          element={
            <AuthGuard user={user}>
              <Dashboard />
            </AuthGuard>
          }
        >
          {/* <Route path="admin-matches" element={<Matches />} />
          <Route path="admin-players" element={<Players />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
