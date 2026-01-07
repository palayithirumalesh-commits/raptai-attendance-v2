import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AttendanceProvider } from "@/context/AttendanceContext";

// Pages
import Login from "@/pages/Login";
import FaceEnrollment from "@/pages/admin/FaceEnrollment";
import AdminSettings from "@/pages/admin/Settings";
import AdminDashboard from "@/pages/administrator/Dashboard";
import AttendanceRecords from "@/pages/administrator/AttendanceRecords";
import MyAttendance from "@/pages/user/MyAttendance";
import MyProfile from "@/pages/user/MyProfile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && !allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();
  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    switch (role) {
      case 'admin': return '/admin/face-enrollment';
      case 'administrator': return '/administrator/dashboard';
      case 'user': return '/user/my-attendance';
      default: return '/login';
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="/admin/face-enrollment" element={<ProtectedRoute allowedRoles={['admin']}><FaceEnrollment /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
      <Route path="/administrator/dashboard" element={<ProtectedRoute allowedRoles={['administrator']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/administrator/attendance" element={<ProtectedRoute allowedRoles={['administrator']}><AttendanceRecords /></ProtectedRoute>} />
      <Route path="/user/my-attendance" element={<ProtectedRoute allowedRoles={['user']}><MyAttendance /></ProtectedRoute>} />
      <Route path="/user/my-profile" element={<ProtectedRoute allowedRoles={['user']}><MyProfile /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <AttendanceProvider>
            <AppRoutes />
          </AttendanceProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
