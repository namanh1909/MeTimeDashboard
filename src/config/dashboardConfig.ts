import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '#',
      disabled: true,
    },
    {
      title: 'Support',
      href: '#',
    },
    {
      title: 'Another link',
      href: '#',
    },
  ],
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
    },

    {
      title: 'Brands',
      href: '/brands',
      icon: 'brand',
    },
    {
      title: 'Products',
      href: '/products',
      icon: 'product',
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: 'order',
    },
    {
      title: 'Users',
      href: '/users',
      icon: 'user',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'settings',
    },
  ],
};
