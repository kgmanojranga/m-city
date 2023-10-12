//React
import { useEffect, useState } from "react";

//React-router-dom
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

//Components
import { Header } from "./components/header-footer";
import { Footer } from "./components/header-footer";
import { Home } from "./components/home";
import { Signin } from "./components/sign-in";
import { AdminPlayers } from "./components/admin/players";

//Firebase
import { auth } from "./components/config/firebase-config";
import { User } from "firebase/auth";

//Toastify-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/admin/Dashboard";
import { AuthGuard } from "./hoc";
import { AddEditPlayers } from "./components/admin/players/AddEditPlayers";

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
        />
        <Route
          path="admin-players"
          element={
            <AuthGuard user={user}>
              <AdminPlayers />
            </AuthGuard>
          }
        />
        <Route
          path="admin-players/add-player"
          element={
            <AuthGuard user={user}>
              <AddEditPlayers />
            </AuthGuard>
          }
        />
        <Route
          path="admin-players/edit-player/:playerid"
          element={
            <AuthGuard user={user}>
              <AddEditPlayers />
            </AuthGuard>
          }
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
