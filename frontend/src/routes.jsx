import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MonitorDetails from "./pages/MonitorDetails";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitor/:id" element={<MonitorDetails />} />
      </Routes>
    </Router>
  );
}
