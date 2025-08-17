import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { publicRoutes, protectedRoutes, fallbackRoute } from "@/config/routes";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/auth/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" />} />

    {publicRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={<PublicRoute>{element}</PublicRoute>} />
    ))}

    {protectedRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
    ))}

    <Route path={fallbackRoute.path} element={fallbackRoute.element} />
  </Routes>
);
