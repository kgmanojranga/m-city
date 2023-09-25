import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/header-footer/Header";
import { Footer } from "./components/header-footer/Footer";
import { Home } from "./components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
