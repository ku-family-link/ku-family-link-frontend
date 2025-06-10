import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoginSelect from './pages/LoginSelect';
import MainTabsPage from './pages/MainTabsPage';
import FitbitTabsPage from './pages/FitbitTabsPage';
import FitbitCallback from './pages/FitbitCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelect />} />
        <Route path="/fitbit/callback" element={<FitbitCallback />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainTabsPage />} />
        <Route path="/fitbit" element={<FitbitTabsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
