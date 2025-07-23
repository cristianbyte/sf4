import { useState, useEffect } from 'react';
import { X, Send, Users } from 'lucide-react';

const ChatSidebar = ({ isOpen, onClose, isAuthenticated }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Usuario1', message: '¡Vamos Colombia! 🇨🇴', time: '19:45' },
    { id: 2, user: 'BoxingFan', message: 'La pelea va a estar épica', time: '19:46' },
    { id: 3, user: 'WestcolFan', message: 'El mejor evento del año 🔥', time: '19:47' },
  ]);
  const [onlineCount] = useState(1247);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !isAuthenticated) return;

    const newMessage = {
      id: Date.now(),
      user: 'Tú',
      message: message.trim(),
      time: new Date().toLocaleTimeString('es-CO', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gray-800 border-l border-gray-700
        transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Users size={20} className="text-primary-500" />
              <span className="font-semibold">Chat Global</span>
              <span className="text-sm text-gray-400">({onlineCount})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-primary-400">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-200">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            {isAuthenticated ? (
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Inicia sesión para chatear
                </p>
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  Iniciar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative ml-auto w-full max-w-sm bg-gray-800 h-full">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-primary-500" />
                  <span className="font-semibold">Chat Global</span>
                  <span className="text-sm text-gray-400">({onlineCount})</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-primary-400">
                        {msg.user}
                      </span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-200">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                {isAuthenticated ? (
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      Inicia sesión para chatear
                    </p>
                    <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm transition-colors">
                      Iniciar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;