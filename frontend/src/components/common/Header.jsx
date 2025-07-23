import { useState } from 'react';
import { Menu, X, MessageCircle, User, LogIn } from 'lucide-react';

const Header = ({ onToggleChat, isChatOpen, isAuthenticated, setIsAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-boxing font-bold text-primary-500">
              SF4
            </h1>
            <span className="ml-2 text-sm text-gray-300 hidden sm:block">
              Stream Fighters 4
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#fights" className="text-gray-300 hover:text-white transition-colors">
              Peleas
            </a>
            <a href="#sponsors" className="text-gray-300 hover:text-white transition-colors">
              Patrocinadores
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Chat Toggle */}
            <button
              onClick={onToggleChat}
              className={`p-2 rounded-lg transition-colors ${
                isChatOpen 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageCircle size={20} />
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
              >
                <User size={16} />
                <span className="text-sm">Usuario</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthenticated(true)}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn size={16} />
                <span className="text-sm">Iniciar Sesión</span>
              </button>
            )}

            {/* Buy Tickets Button */}
            <button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors">
              Comprar Boletas
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onToggleChat}
              className={`p-2 rounded-lg transition-colors ${
                isChatOpen 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              <MessageCircle size={20} />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-700 text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
              <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-white">
                Inicio
              </a>
              <a href="#fights" className="block px-3 py-2 text-gray-300 hover:text-white">
                Peleas
              </a>
              <a href="#sponsors" className="block px-3 py-2 text-gray-300 hover:text-white">
                Patrocinadores
              </a>
              
              <div className="pt-4 pb-2 border-t border-gray-700 space-y-2">
                {isAuthenticated ? (
                  <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg"
                  >
                    <User size={16} />
                    <span>Usuario</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsAuthenticated(true)}
                    className="w-full flex items-center space-x-2 bg-primary-600 px-3 py-2 rounded-lg"
                  >
                    <LogIn size={16} />
                    <span>Iniciar Sesión</span>
                  </button>
                )}
                
                <button className="w-full bg-gold-500 text-black font-semibold px-3 py-2 rounded-lg">
                  Comprar Boletas
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;