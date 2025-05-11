import React, { FC, ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { AuthenticationPage } from '@/pages';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode; // Add this line to accept children
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <AuthenticationPage />; // Render children if not authenticated
  }

  if (isAuthenticated && location.pathname === '/auth') {
    return <Navigate to="/" />;
  }

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
