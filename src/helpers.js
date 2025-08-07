const API_URL = 'https://dice-5dak.onrender.com'; // Change this to your Express server's LAN IP

// Load enabled colors from local CSV
export async function loadEnabledColors() {
  try {
    const res = await fetch(`${API_URL}/colors`);
    const data = await res.json(); // Expected format: { colors: ["red", "blue", ...] }
    return data.colors;
  } catch (err) {
    console.error('Failed to load colors from CSV', err);
    return [];
  }
}

// Save enabled colors to local CSV
export async function saveEnabledColors(colors) {
  try {
    const res = await fetch(`${API_URL}/colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ colors }),
    });

    if (!res.ok) throw new Error('Non-OK response');
    return true;
  } catch (err) {
    console.error('Failed to save colors to CSV', err);
    return false;
  }
}
