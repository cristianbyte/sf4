import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { UserProvider } from "./context/userCotext";
import Main from './pages/main';
import Luchador from './pages/luchador/Luchador';

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
            <Route path="/luchador/lavaldiri" element={<Luchador name = {'LaValdiri'} />} />
            <Route path="/luchador/yina" element={<Luchador name={'Yina'} />} />
            <Route path="/luchador/jhdelacruz" element={<Luchador name={'JHdelaCruz'} />} />
            <Route path="/luchador/cristorata" element={<Luchador name={'Cristorata'} />} />
            <Route path="/luchador/karely" element={<Luchador name={'Karely'} />} />
            <Route path="/luchador/karina" element={<Luchador name={'Karina'} />} />
            <Route path="/luchador/belosmaki" element={<Luchador name={'Belosmaki'} />} />
            <Route path="/luchador/shelao" element={<Luchador name={'Shelao'} />} />
            <Route path="/luchador/may" element={<Luchador name={'May'} />} />
            <Route path="/luchador/milica" element={<Luchador name={'Milica'} />} />
            <Route path="/luchador/byking" element={<Luchador name={'Byking'} />} />
            <Route path="/luchador/thenino" element={<Luchador name={'TheNino'} />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;