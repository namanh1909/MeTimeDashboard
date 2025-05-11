'use client';

import * as React from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//import { siteConfig } from "@/config/site"
import MobileNav from '../MobileNav/MobileNav';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

const MainNav = ({ items, children }: MainNavProps) => {
  const location = useLocation();
  const segment = location.pathname.split('/')[1];
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 w-full md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <img src="/logo_single.svg" width={48} height={48} alt="Logo" />
        <span className="hidden font-bold sm:inline-block">
          {/* {siteConfig.name} */}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item) => (
            <Link
              key={item.id}
              to={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <Icons.close />
        ) : (
          <img src="/logo_single.svg" width={48} height={48} alt="Logo" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};

export default MainNav;
