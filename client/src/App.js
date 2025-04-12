import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import CountryDetailPage from './Pages/CountryDetailPage/CountryDetailPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ApiKeyPage from './Pages/ApiKeyPage/ApiKeyPage';
import EndpointPage from './Pages/EndpointPage/EndpointPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/keys" element={<ApiKeyPage />} />
        <Route exact path="/endpoints" element={<EndpointPage />} />
        <Route exact path="/country/:id" element={<CountryDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
