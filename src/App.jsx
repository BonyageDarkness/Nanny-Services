import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Nannies from "./pages/Nannies";
import FavoritesPage from "./pages/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <Router basename="/Nanny-Services/">
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
