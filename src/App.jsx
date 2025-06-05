import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FitbitLoginPage from './pages/FitbitLoginPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoginSelect from './pages/LoginSelect';
import MainTabsPage from './pages/MainTabsPage';
import FitbitTabsPage from './pages/FitbitTabsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelect />} />
        <Route path="/FitbitLogin" element={<FitbitLoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainTabsPage />} />
        <Route path="/Fibit" element={<FitbitTabsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
