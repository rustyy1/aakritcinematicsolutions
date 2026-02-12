import { Routes, Route } from 'react-router-dom';
import HomeExperience from './pages/HomeExperience';
import DroneShowcase from './pages/DroneShowcase';
// import Invoice from "./components/sections/invoice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeExperience />} />
      <Route path="/drone" element={<DroneShowcase />} />
      {/* <Route path="/invoice" element={<Invoice />} /> */}
    </Routes>
  );
}

export default App;
