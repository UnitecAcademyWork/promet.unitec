import React from 'react';
// import Sidebar from '@/components/Sidebar/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* <Sidebar /> */}
      <div className="flex-grow h-full bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
