import React, { useState } from 'react';
import { Header } from './Header';
import { NavigationSidebar } from './NavigationSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <NavigationSidebar 
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
