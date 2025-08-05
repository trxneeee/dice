import { useState, useEffect } from 'react';
import { loadEnabledColors } from './helpers';
import './App.css';

const ALL_COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function ColorDice() {
  const [diceCount, setDiceCount] = useState(1);
  const [diceColors, setDiceColors] = useState([]);
  const [excludedColors, setExcludedColors] = useState([]);

  useEffect(() => {
    const poll = async () => {
      const latest = await loadEnabledColors();
      setExcludedColors(latest);
    };

    poll(); // Initial
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  }, []);

const rollDice = async () => {
  const availableColors = ALL_COLORS.filter(c => !excludedColors.includes(c));
  if (availableColors.length === 0) return;

  const newColors = Array.from({ length: diceCount }, () =>
    getRandomColor(availableColors)
  );

  setDiceColors([]);
  newColors.forEach((color, index) => {
    setTimeout(() => {
      setDiceColors(prev => [...prev, color]);
    }, index * 200);
  });

  // 🔴 Immediately clear the sheet after rolling
  await fetch(
    'https://script.google.com/macros/s/AKfycbzDLjcWrGyoeDqzU-TV5YTvBi54Td-l_VdrluwqbhheNR9zY1La3lCyYQ7GX343hbYw/exec?action=delete_all'
  );
};


  return (
    <div className="inner">
      <h1>🎲 Color Dice Roller</h1>

      <div className="controls">
        <label htmlFor="dice-count">Number of Dice:</label>
        <input
          id="dice-count"
          type="number"
          min="1"
          max="10"
          value={diceCount}
          onChange={e =>
            setDiceCount(Math.max(1, Math.min(5, Number(e.target.value))))
          }
        />
        <button
          onClick={rollDice}
          disabled={ALL_COLORS.filter(c => !excludedColors.includes(c)).length === 0}
        >
          Roll Dice
        </button>
      </div>

      <div className="dice-wrapper">
  <div className="dice-container">
    {diceColors.map((color, index) => (
      <div
        key={index}
        className="die"
        style={{ '--final-color': color.toLowerCase() }}
      >
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default ColorDice;
