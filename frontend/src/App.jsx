import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { UserProvider } from "./context/userCotext";
import Main from './pages/main';
import io from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    })

    newSocket.on('connect', () => {
      console.log('✅ Conectado al servidor!')
      setConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor')
      setConnected(false)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route index element={<Main />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;