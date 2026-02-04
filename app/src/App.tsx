import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

// Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import WorkOrders from '@/pages/WorkOrders';
import WorkOrderDetail from '@/pages/WorkOrders/Detail';
import Dispatch from '@/pages/Dispatch';
import Inspection from '@/pages/Inspection';
import Audit from '@/pages/Audit';
import Reports from '@/pages/Reports';
import Inspectors from '@/pages/Inspectors';
import InspectionTemplates from '@/pages/InspectionTemplates';
import Settings from '@/pages/Settings';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Layout Component
function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/inspection" element={<Inspection />} />
            <Route path="/inspection/:id" element={<Inspection />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/audit/:id" element={<Audit />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<Reports />} />
            <Route path="/inspection-templates" element={<InspectionTemplates />} />
            <Route path="/inspectors" element={<Inspectors />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
