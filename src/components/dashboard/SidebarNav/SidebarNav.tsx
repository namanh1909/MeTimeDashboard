import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';

interface SidebarNavProps {
  items: SidebarNavItem[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const location = useLocation();
  const path = location.pathname;

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <NavLink key={item.title} to={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </NavLink>
          )
        );
      })}
    </nav>
  );
};

export default SidebarNav;
