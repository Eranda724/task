import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Treatments from './pages/Treatments';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import RequireAdmin from './components/RequireAdmin';
import AdminTreatments from './pages/admin/AdminTreatments';
import AdminRooms from './pages/admin/AdminRooms';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminContent from './pages/admin/AdminContent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/property" element={<PropertyDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route path="/admin" element={<RequireAdmin><Navigate to="/admin/dashboard" replace /></RequireAdmin>} />
        <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/treatments" element={<RequireAdmin><AdminTreatments /></RequireAdmin>} />
        <Route path="/admin/rooms" element={<RequireAdmin><AdminRooms /></RequireAdmin>} />
        <Route path="/admin/content" element={<RequireAdmin><AdminContent /></RequireAdmin>} />
        <Route path="/admin/staff" element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
        <Route path="/admin/settings" element={<RequireAdmin><AdminSettings /></RequireAdmin>} />
      </Routes>
    </BrowserRouter>
  );
}