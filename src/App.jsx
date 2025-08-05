import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ColorDice from './ColorDice';
import Settings from './Settings';
import bg from './assets/bg.png';
import './App.css';
function App() {
  return (
    <Router>
      <div
  className="app"
>
        <Routes>
          <Route path="/" element={<ColorDice />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
