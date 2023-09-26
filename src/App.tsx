import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/header-footer/Header";
import { Footer } from "./components/header-footer/Footer";
import { Home } from "./components/home/Home";
import { Signin } from "./components/sign-in/Signin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<Signin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
