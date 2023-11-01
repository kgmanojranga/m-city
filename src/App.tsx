//React-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import { Header } from "./components/header-footer";
import { Footer } from "./components/header-footer";
import { Home } from "./components/home";
import { Signin } from "./components/sign-in";
import { AdminPlayers } from "./components/admin/players";
import { Dashboard } from "./components/admin/Dashboard";
import { AddEditPlayers } from "./components/admin/players/AddEditPlayers";
import { TheTeam } from "./components/the-team";
import { AddEditMatches, AdminMatches } from "./components/admin/matches";
import { TheMatches } from "./components/the-matches";
import { NotFound } from "./components/not-found/NotFound";

//Toastify-library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="the-team" element={<TheTeam />} />
          <Route path="the-matches" element={<TheMatches />} />
          <Route path="dashboard" element={<Dashboard />} />
          //Admin Routes
          <Route path="admin-players" element={<AdminPlayers />} />
          <Route path="admin-players/add-player" element={<AddEditPlayers />} />
          <Route
            path="admin-players/edit-player/:playerid"
            element={<AddEditPlayers />}
          />
          <Route path="admin-matches" element={<AdminMatches />} />
          <Route path="admin-matches/add-match" element={<AddEditMatches />} />
          <Route
            path="admin-matches/edit-match/:matchid"
            element={<AddEditMatches />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
