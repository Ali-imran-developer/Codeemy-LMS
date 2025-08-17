import React from 'react';
import { NavLink } from 'react-router-dom';
import {Home, Calendar, GraduationCap, BookOpen, TrendingUp, Clock, Mail, FileText, Users, Settings, Phone, HelpCircle, ChevronLeft, ChevronRight} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Home', href: '/dashboard', icon: Home, description: 'Dashboard overview' },
  { name: 'To-do Calendar', href: '/calendar', icon: Calendar, description: 'Manage your schedule' },
  { name: 'Grade Book', href: '/grades', icon: GraduationCap, description: 'View grades and results' },
  { name: 'Account Book', href: '/account', icon: BookOpen, description: 'Financial information' },
  { name: 'Progress', href: '/progress', icon: TrendingUp, description: 'Track your progress' },
  { name: 'Lecture Schedule', href: '/lectures', icon: Clock, description: 'Class timetable' },
  { name: 'Mail', href: '/mail', icon: Mail, description: 'Messages and emails' },
  { name: 'Notes', href: '/notes', icon: FileText, description: 'Personal notes' },
  { name: 'My Study Courses', href: '/courses', icon: BookOpen, description: 'Enrolled courses' },
  { name: 'Student Services', href: '/services', icon: Users, description: 'Support services' },
  { name: 'Course Selection', href: '/course-selection', icon: Settings, description: 'Select courses' },
  { name: 'Contact Us', href: '/contact', icon: Phone, description: 'Get in touch' },
  { name: 'Help', href: '/help', icon: HelpCircle, description: 'Help and support' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user } = useAuth();

  return (
    <>

      {isOpen && (<div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onToggle} />)}
      
      <aside className={cn("fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] bg-background border-l border-border transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-[calc(100vh-4rem)] md:translate-x-0", isOpen ? "translate-x-0" : "translate-x-full", "w-80")}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-academic-text">Navigation</h2>
            <Button  variant="ghost"  size="sm"  onClick={onToggle} className="h-8 w-8 p-0">
              {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <div className="p-4 border-b bg-academic-gray/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-academic-text">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                {user?.department && (
                  <p className="text-xs text-muted-foreground">{user.department}</p>
                )}
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <NavLink key={item.href} to={item.href} className={({ isActive }) => cn("flex items-start space-x-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground", isActive && "bg-primary text-primary-foreground hover:bg-primary/90")}>
                  <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-xs opacity-80 truncate">{item.description}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                EduPlatform LMS v1.0
              </p>
              <p className="text-xs text-muted-foreground">
                © 2024 Educational Institute
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
