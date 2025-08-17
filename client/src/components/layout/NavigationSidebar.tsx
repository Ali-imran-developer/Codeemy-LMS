import React from 'react';
import { NavLink } from 'react-router-dom';
import {Home, Calendar, GraduationCap, BookOpen, TrendingUp, Clock, Mail, FileText, Users, Settings, Phone, HelpCircle, Menu} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationItem {name: string; href: string; icon: React.ComponentType<{ className?: string }>}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Grade Book', href: '/grades', icon: GraduationCap },
  { name: 'Account Book', href: '/account', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Lecture Schedule', href: '/lectures', icon: Clock },
  { name: 'Mail', href: '/mail', icon: Mail },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'My Study Courses', href: '/courses', icon: BookOpen },
  { name: 'Student Services', href: '/services', icon: Users },
  { name: 'Course Selection', href: '/course-selection', icon: Settings },
  { name: 'Contact Us', href: '/contact', icon: Phone },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

interface NavigationSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ 
  collapsed,
  mobileOpen,
  onToggleMobile,
  onToggleCollapse,
}) => {

  return (
    <>
      {mobileOpen && (<div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onToggleMobile}/>)}

      <aside className={cn("fixed left-0 top-0 z-50 h-screen bg-background border-r border-border transition-all duration-300 ease-in-out", collapsed ? "w-20" : "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full", "lg:translate-x-0")}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-primary/5">
            {!collapsed && (
              <div className="max-w-40">
                <img src="/assets/logo-icon.png" alt="Logo Favicon" className='w-full h-full object-cover' />
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="h-8 w-11 p-0 hidden lg:flex">
              {collapsed ? (<Menu className="h-5 w-5 text-primary" />) : (<Menu className="h-5 w-5 text-primary" />)}
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {navigationItems?.map((item) => (
                <NavLink key={item?.href} to={item?.href} className={({ isActive }) => cn("flex items-center rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground", isActive && "bg-primary text-primary-foreground hover:bg-primary/90", collapsed && "justify-center")}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (<span className="ml-3 font-medium">{item.name}</span>)}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
