import React from 'react';

import { useNavigate } from 'react-router-dom';

import MainNav from '@/components/dashboard/MainNav/MainNav';
import SidebarNav from '@/components/dashboard/SidebarNav/SidebarNav';
import UserNav from '@/components/dashboard/UserNav/UserNav';
import { dashboardConfig } from '@/config/dashboardConfig';

const RootLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleSidebarNavClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4 px-8">
          <MainNav items={dashboardConfig.mainNav} />
          <UserNav />
        </div>
      </header>
      <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="w-[200px] flex-col md:flex pl-8">
          <SidebarNav
            items={dashboardConfig.sidebarNav.map((item) => ({
              ...item,
              onClick: () => handleSidebarNavClick(item.href as string),
            }))}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
const LayoutComponent = ({ children }: { children?: React.ReactNode }) => {
  return <RootLayout>{children}</RootLayout>;
};

export default LayoutComponent;
