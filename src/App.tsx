import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ShoeDetail from "@/pages/ShoeDetail";
import Gallery from "@/pages/Gallery";
import DesignerStudio from "@/pages/DesignerStudio";
import DesignGallery from "@/pages/DesignGallery";
import CityMap from "@/pages/CityMap";
import Kingdom from "@/pages/Kingdom";
import ExhibitionHall from "@/pages/ExhibitionHall";
import FashionMagazine from "@/pages/FashionMagazine";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shoe/:id" element={<ShoeDetail />} />
        <Route path="/studio" element={<DesignerStudio />} />
        <Route path="/studio/gallery" element={<DesignGallery />} />
        <Route path="/city-map" element={<CityMap />} />
        <Route path="/kingdom" element={<Kingdom />} />
        <Route path="/exhibition" element={<ExhibitionHall />} />
        <Route path="/magazine" element={<FashionMagazine />} />
      </Routes>
    </Router>
  );
}
