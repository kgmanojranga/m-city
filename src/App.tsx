//React
import { useEffect, useState } from "react";

//React-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import { Header } from "./components/header-footer";
import { Footer } from "./components/header-footer";
import { Home } from "./components/home";
import { Signin } from "./components/sign-in";
import { AdminPlayers } from "./components/admin/players";
import { Dashboard } from "./components/admin/Dashboard";
import { AuthGuard } from "./hoc";
import { AddEditPlayers } from "./components/admin/players/AddEditPlayers";
import { TheTeam } from "./components/the-team";
import { AddEditMatches, AdminMatches } from "./components/admin/matches";
import { TheMatches } from "./components/the-matches";
import { NotFound } from "./components/not-found/NotFound";

//Firebase
import { auth } from "./config/firebase-config";
import { User } from "firebase/auth";

//Toastify-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="the-team" element={<TheTeam />} />
        <Route path="the-matches" element={<TheMatches />} />
        <Route
          path="dashboard"
          element={
            <AuthGuard user={user}>
              <Dashboard />
            </AuthGuard>
          }
        />
        //Admin Routes
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
        <Route
          path="admin-matches"
          element={
            <AuthGuard user={user}>
              <AdminMatches />
            </AuthGuard>
          }
        />
        <Route
          path="admin-matches/add-match"
          element={
            <AuthGuard user={user}>
              <AddEditMatches />
            </AuthGuard>
          }
        />
        <Route
          path="admin-matches/edit-match/:matchid"
          element={
            <AuthGuard user={user}>
              <AddEditMatches />
            </AuthGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
