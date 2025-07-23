import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatSidebar from '../chat/ChatSidebar';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <Header 
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Page Content */}
        <main className={`flex-1 transition-all duration-300 ${isChatOpen ? 'lg:mr-80' : ''}`}>
          <Outlet />
        </main>

        {/* Chat Sidebar - Desktop */}
        <ChatSidebar 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          isAuthenticated={isAuthenticated}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;