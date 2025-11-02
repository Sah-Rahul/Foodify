import { Navigate } from "react-router-dom";
import { useUserStore } from "@/zustand/useUserStore";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;

  return <>{children}</>;
};

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.admin) return <Navigate to="/" replace />;

  return <>{children}</>;
};
