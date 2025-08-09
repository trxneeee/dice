import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ColorDice from './ColorDice';
import Settings from './Settings';
import bg from './assets/bg.png';
import light from './assets/light.png';
import './App.css';

function App() {
  return (
    <Router>
      <div
        style={{
          fontFamily: '"Marvin", Arial, sans-serif',
          fontSize: '16px',
          color: '#fff',
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: `url(${bg}), radial-gradient(#d2ebfe, #08f)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
          backgroundPosition: 'center',
        }}
      >
        {/* Light overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${light})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'repeat-x',
            pointerEvents: 'none',
          }}
        ></div>

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<ColorDice />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
