import { useState, useEffect } from 'react';
import { loadEnabledColors, saveEnabledColors } from './helpers';
import './App.css';

const ALL_COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

function Settings() {
  const [enabledColors, setEnabledColors] = useState([]);

  useEffect(() => {
    loadEnabledColors().then(setEnabledColors);
  }, []);

  const toggleColor = color => {
    setEnabledColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const saveChanges = async () => {
    await saveEnabledColors(enabledColors);
    alert('✅ Saved to Google Sheet!');
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

      <button onClick={saveChanges}>💾 Save</button>
    </div>
  );
}

export default Settings;
