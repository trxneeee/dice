import { useState, useEffect } from 'react';
import { loadEnabledColors } from './helpers';
import './App.css';
import rollSound from './assets/roll-sound.mp3';
import title from './assets/title.png';

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
  const loaderMessages = [
  "Let's Roll!",
  "Let's Go!",
  "Feeling Lucky?",
  "Good Luck"
];
const [loaderMessage, setLoaderMessage] = useState(loaderMessages[0]);

  const [excludedColors, setExcludedColors] = useState([]);
  const [diceType, setDiceType] = useState('color'); // 'color' or 'number'
  const [rolling, setRolling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rollId, setRollId] = useState(Date.now());

  useEffect(() => {
    const poll = async () => {
      const latest = await loadEnabledColors();
      setExcludedColors(latest);
    };
    poll();
    rollDice();
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load Google Ads script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', 'ca-pub-4469574894345660');
    document.body.appendChild(script);

    script.onload = () => {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    };
  }, []);

   useEffect(() => {
    // Ensure Google Ads script is loaded
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.setAttribute("data-ad-client", "ca-pub-4469574894345660");
    document.body.appendChild(script);

    // Push ad after script is ready
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn("Adsbygoogle push failed", err);
      }
    };
  }, []);

  const rollDice = async () => {
    if (rolling) return;

    setLoading(true);
      setLoaderMessage(loaderMessages[Math.floor(Math.random() * loaderMessages.length)]);

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
    }, 1000);

    setTimeout(() => {
      setLoading(false);
    }, 2500);

    await fetch('http://192.168.100.24:5000/colors', { method: 'DELETE' });
  };

  // Loader replaces all content when active
  if (loading) {
  return (
    <div className="loader">
      <div className="loader-wrapper">
        <div className="loader-loader">
          <h1 className="loader-title">{loaderMessage}</h1>
          <div className="dice-container">
            {diceColors.map((color, index) => (
              <div
                key={`loader-${index}`}
                className={`die ${rolling ? 'rolling' : ''}`}
                style={
                  diceType === 'color'
                    ? { '--final-color': getFinalColorCode(color) }
                    : {}
                }
              >
                {diceType === 'number' ? color : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


  // Main content when not loading
  return (
    <div className="inner">
       <div className={`page-content ${loading ? 'fade-out' : ''}`}>
      <img id="logo" src={title} alt="Logo" height="40" style={{ width: 'auto' }} />

      <div
        id="ad-box-top"
        className="centered"
        style={{
          margin: '15px auto',
          minHeight: '0px',
          maxHeight: 'none',
          height: 'auto',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            minWidth: '250px',
            maxWidth: '100%',
            width: '100%',
            maxHeight: '336px',
            height: '280px',
          }}
          data-ad-client="ca-pub-4469574894345660"
          data-ad-slot="8539262816"
          data-ad-format="rectangle,horizontal"
          data-full-width-responsive="true"
        />
      </div>

      <div className="dice-wrapper">
        <div className="title">ROLL COLOR DICE</div>

        <div className="dropdown-container">
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
              className={`die2 ${rolling ? 'rolling' : ''}`}
              style={
                diceType === 'color'
                  ? { '--final-color': getFinalColorCode(color) }
                  : {}
              }
            >
              {diceType === 'number' ? color : ''}
            </div>
          ))}
        </div>
 <div
      id="ad-box-bottom"
      className="position-fix"
      style={{ margin: "15px 0", minHeight: "1px" }}
    >
      <ins
        id="bottom-ad"
        className="adsbygoogle"
        style={{
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          minWidth: "250px",
          maxWidth: "100%",
          width: "100%",
          height: "280px",
        }}
        data-ad-client="ca-pub-4469574894345660"
        data-ad-slot="9968255949"
        data-ad-format="rectangle,horizontal"
        data-full-width-responsive="true"
      />
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
            <span className="red" style={{ color: 'red' }}>Red</span>,{" "}
            <span className="orange">Orange</span>,{" "}
            <span className="yellow">Yellow</span>,{" "}
            <span className="green">Green</span>,{" "}
            <span className="blue">Blue</span>, and{" "}
            <span className="purple">Purple</span>.
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ColorDice;
