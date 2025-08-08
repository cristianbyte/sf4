import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;