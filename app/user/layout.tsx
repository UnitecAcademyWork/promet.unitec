import React from "react";
import Sidebar, { SidebarLayout } from "../../components/Landing/SideBar/SideBar";
import { SidebarProvider } from "../../context/SidebarContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar fixa à esquerda */}

      {/* Conteúdo principal */}
        <Sidebar />
      <main className="flex-1 transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
