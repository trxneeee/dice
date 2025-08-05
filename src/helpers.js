const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzDLjcWrGyoeDqzU-TV5YTvBi54Td-l_VdrluwqbhheNR9zY1La3lCyYQ7GX343hbYw/exec';

// Load enabled colors from Google Sheets
export async function loadEnabledColors() {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=get_names`);
    const data = await res.json();
    return data.names.map(item => item.name); // Make sure this matches backend response
  } catch (err) {
    console.error('Failed to load colors from sheet', err);
    return [];
  }
}
// Save enabled colors to Google Sheets
// ✅ New improved version
export async function saveEnabledColors(colors) {
  try {
    const params = new URLSearchParams({
      action: 'insert_names_batch', // <-- add new handler in GAS
      names: JSON.stringify(colors),
    });
    await fetch(`${WEB_APP_URL}?${params.toString()}`);
    return true;
  } catch (err) {
    console.error('Failed to save colors to sheet', err);
    return false;
  }
}
