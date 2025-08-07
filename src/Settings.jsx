import { useState, useEffect } from 'react';
import { loadEnabledColors, saveEnabledColors } from './helpers';
import './App.css';

const ALL_COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

function Settings() {
  const [enabledColors, setEnabledColors] = useState([]);

  // 🔁 Real-time fetch every 2 seconds
  useEffect(() => {
    const fetchColors = async () => {
      const latest = await loadEnabledColors();
      setEnabledColors(latest);
    };

    fetchColors(); // initial load
    const interval = setInterval(fetchColors, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // 🟡 On color click: toggle + save
  const toggleColor = async (color) => {
    const updatedColors = enabledColors.includes(color)
      ? enabledColors.filter(c => c !== color)
      : [...enabledColors, color];

    setEnabledColors(updatedColors);
    await saveEnabledColors(updatedColors);
  };

  return (
    <div className="app">
      <div className="dice-settings">
        {ALL_COLORS.map(color => {
          const isEnabled = enabledColors.includes(color);
          return (
            <div
              key={color}
              className={`dice-toggle ${color.toLowerCase()} ${isEnabled ? 'excluded' : ''}`}
              onClick={() => toggleColor(color)}
              title={color}
            >
              {isEnabled && <span className="xmark">❌</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
