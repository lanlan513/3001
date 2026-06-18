import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ShoeDetail from "@/pages/ShoeDetail";
import Gallery from "@/pages/Gallery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shoe/:id" element={<ShoeDetail />} />
      </Routes>
    </Router>
  );
}
