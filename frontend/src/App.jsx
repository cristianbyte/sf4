import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { UserProvider } from "./context/userCotext";
import Main from './pages/main';
import Luchador from './pages/luchador/lavaldiri';

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
            <Route path="/luchador/lavaldiri" element={<Luchador name = {'lavaldiri'} />} />
            <Route path="/luchador/yina" element={<Luchador name={'yina'} />} />
            <Route path="/luchador/jhdelacruz" element={<Luchador name={'jhdelacruz'} />} />
            <Route path="/luchador/cristorata" element={<Luchador name={'cristorata'} />} />
            <Route path="/luchador/karely" element={<Luchador name={'karely'} />} />
            <Route path="/luchador/karina" element={<Luchador name={'karina'} />} />
            <Route path="/luchador/belosmaki" element={<Luchador name={'belosmaki'} />} />
            <Route path="/luchador/shelao" element={<Luchador name={'shelao'} />} />
            <Route path="/luchador/may" element={<Luchador name={'may'} />} />
            <Route path="/luchador/milica" element={<Luchador name={'milica'} />} />
            <Route path="/luchador/byking" element={<Luchador name={'byking'} />} />
            <Route path="/luchador/thenino" element={<Luchador name={'thenino'} />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;