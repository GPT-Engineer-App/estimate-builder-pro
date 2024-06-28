import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobSelection from "./pages/JobSelection.jsx";
import CustomerInfo from "./pages/CustomerInfo.jsx";
import JobConfiguration from "./pages/JobConfiguration.jsx"; // Import JobConfiguration page
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/job-selection" element={<JobSelection />} />
        <Route exact path="/customer-info" element={<CustomerInfo />} />
        <Route exact path="/job-configuration" element={<JobConfiguration />} /> {/* Add JobConfiguration route */}
      </Routes>
    </Router>
  );
}

export default App;