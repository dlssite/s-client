import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { DashboardLayout } from './components/layouts/DashboardLayout/DashboardLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Analytics } from './pages/dashboard/Analytics';
import { Customization } from './pages/dashboard/Customization';
import { Achievements } from './pages/dashboard/Achievements';
import { Apps } from './pages/dashboard/Apps';
import { ProfileSettings } from './pages/settings/ProfileSettings';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthCallback } from './pages/auth/AuthCallback';
import { PublicProfile } from './pages/profile/PublicProfile';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/customization" element={<Customization />} />
            <Route path="/dashboard/achievements" element={<Achievements />} />
            <Route path="/dashboard/apps" element={<Apps />} />
            <Route path="/dashboard/settings" element={<ProfileSettings />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/:username" element={<PublicProfile />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
