import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobSelection from "./pages/JobSelection.jsx";
import CustomerInfo from "./pages/CustomerInfo.jsx";
import JobConfiguration from "./pages/JobConfiguration.jsx";
import EstimateBuilder from "./pages/EstimateBuilder.jsx"; // Import EstimateBuilder page
import JobConfigurationPage from "./pages/JobConfigurationPage.jsx";
import BuildEstimatePage from "./pages/BuildEstimatePage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/job-selection" element={<JobSelection />} />
        <Route exact path="/customer-info" element={<CustomerInfo />} />
        <Route exact path="/job-configuration" element={<JobConfigurationPage />} />
        <Route exact path="/estimate-builder" element={<EstimateBuilder />} /> {/* Add EstimateBuilder route */}
        <Route exact path="/build-estimate" element={<BuildEstimatePage />} />
      </Routes>
    </Router>
  );
}

export default App;