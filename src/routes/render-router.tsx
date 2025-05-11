import { FC } from 'react';

import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import ProtectedRoute from './protectedRoute';
import LayoutComponent from '@/layout';
import { Brands, Dashboard, Orders, Products, Users } from '@/pages';

const RenderRouter: FC = () => {
  const storedToken = localStorage.getItem('token');

  const conditionAuth = Boolean(
    storedToken && storedToken.length > 0 && storedToken !== 'undefined',
  );

  const routes = [
    {
      path: '/',
      element: (
        <ProtectedRoute isAuthenticated={conditionAuth}>
          <LayoutComponent>
            <Outlet />
          </LayoutComponent>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/brands',
          element: <Brands />,
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
