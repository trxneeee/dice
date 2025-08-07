import { useState, useEffect } from 'react';
import { loadEnabledColors } from './helpers';
import './App.css';
import rollSound from './assets/roll-sound.mp3';
const ALL_COLORS = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getFinalColorCode(color) {
  switch (color.toLowerCase()) {
    case 'red': return '#FF0000';
    case 'orange': return '#FFA500';
    case 'yellow': return '#FFD700';
    case 'green': return '#008000';
    case 'blue': return '#0000FF';
    case 'purple': return '#800080';
    default: return 'gray';
  }
}


function ColorDice() {
  const [diceCount, setDiceCount] = useState(1);
  const [diceColors, setDiceColors] = useState([]);
  const [excludedColors, setExcludedColors] = useState([]);
  const [diceType, setDiceType] = useState('color'); // 'color' or 'number'
  const [rolling, setRolling] = useState(false);
  const [rollId, setRollId] = useState(Date.now());
  useEffect(() => {
    const poll = async () => {
      const latest = await loadEnabledColors();
      setExcludedColors(latest);
    };
    poll(); // Initial
    rollDice();
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  }, []);

const rollDice = async () => {
  if (rolling) {
    return;
  }
  const availableColors = ALL_COLORS.filter(c => !excludedColors.includes(c));
  if (availableColors.length === 0) return;

  const audio = new Audio(rollSound);
  audio.play().catch(err => {
    console.warn('Audio failed to play:', err);
  });

  const newColors = Array.from({ length: diceCount }, () =>
    getRandomColor(availableColors)
  );

  setRolling(true);
    setRollId(Date.now());
  setDiceColors(newColors);

  setTimeout(() => {
    setRolling(false);
  }, 500);

  await fetch('http://192.168.100.24:5000/colors', {
    method: 'DELETE',
  });
};





  return (
    <div className="inner">
      <div className="dice-wrapper">
      <div class="title">ROLL COLOR DICE</div>
      <div class="dropdown-container">
       <select
    id="dice-count"
    value={diceCount}
    onChange={(e) => setDiceCount(Number(e.target.value))}
    className="dice-select"
  >
    {[1, 2, 3, 4, 5, 6].map((num) => (
      <option key={num} value={num}>
        {num} {num === 1 ? 'DIE' : 'DICE'}
      </option>
    ))}
  </select>
<select
  id="dice-type"
  value={diceType}
  onChange={(e) => setDiceType(e.target.value)}
  className="dice-select"
>
  <option value="color">COLOR DICE</option>
  <option value="number">6-SIDED NUMBERS</option>
</select>

  </div>

  <div className="dice-container">
{diceColors.map((color, index) => (
  <div
    key={`${rollId}-${index}`}
 // <-- change here
    className={`die ${rolling ? 'rolling' : ''}`}
    style={
      diceType === 'color'
        ? { '--final-color': getFinalColorCode(color)}
        : {}
    }
  >
    {diceType === 'number' ? color : ''}
  </div>
))}

  </div>
        <button
    onClick={rollDice}
    disabled={ALL_COLORS.filter(c => !excludedColors.includes(c)).length === 0}
  >
    Roll Again !
  </button>

  <div className="color-container">
  <div className="color-info" id="colorInfo">
    Possible colors are:{" "}
    <span className="red" style={{color:'red'}}>Red</span>,{" "}
    <span className="orange">Orange</span>,{" "}
    <span className="yellow">Yellow</span>,{" "}
    <span className="green">Green</span>,{" "}
    <span className="blue">Blue</span>, and{" "}
    <span className="purple">Purple</span>.
  </div>
</div>

</div>

    </div>
  );
}

export default ColorDice;
