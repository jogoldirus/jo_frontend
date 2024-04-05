import dayjs from 'dayjs';
import fetch from 'unfetch'
export const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); }

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Récupérez le token depuis votre état ou stockage local
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers // pour ajouter d'autres en-têtes si nécessaire
  };

  // Assurez-vous que le corps est correctement traité seulement si options.body est défini
  const newOptions = {
    method: options.method || 'GET',
    headers,
    ...options.body && { body: JSON.stringify(options.body) }, // Ajoutez le corps uniquement si options.body est défini
  };

  return fetch(url, newOptions).then(async response => {
    console.log(response);
    if (!response.ok) {
      // Si le code de statut HTTP n'est pas 2xx, rejetez la promesse avec le corps de la réponse (si disponible).
      const text = await response.text(); // Utilisez .text() pour obtenir le corps de la réponse comme une chaîne
      try {
        const data = text ? JSON.parse(text) : {}; // Tentez de parser le texte en JSON
        return Promise.reject(data);
      } catch {
        return Promise.reject({ message: 'Failed to parse JSON response' });
      }
    }

    const text = await response.text(); // Lisez la réponse comme texte
    try {
      return JSON.parse(text); // Tentez de parser le texte en JSON
    } catch {
      return {}; // Si la réponse est vide ou ne peut pas être parsée, retournez un objet vide
    }
  });
};
export const fetchWithoutAuth = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers // pour ajouter d'autres en-têtes si nécessaire
  };

  // Assurez-vous que le corps est correctement traité seulement si options.body est défini
  const newOptions = {
    method: options.method || 'GET',
    headers,
    ...options.body && { body: JSON.stringify(options.body) }, // Ajoutez le corps uniquement si options.body est défini
  };

  return fetch(url, newOptions).then(async response => {
    if (!response.ok) {
      // Si le code de statut HTTP n'est pas 2xx, rejetez la promesse avec le corps de la réponse (si disponible).
      const text = await response.text(); // Utilisez .text() pour obtenir le corps de la réponse comme une chaîne
      try {
        const data = text ? JSON.parse(text) : {}; // Tentez de parser le texte en JSON
        return Promise.reject(data);
      } catch {
        return Promise.reject({ message: 'Failed to parse JSON response' });
      }
    }

    const text = await response.text(); // Lisez la réponse comme texte
    try {
      return JSON.parse(text); // Tentez de parser le texte en JSON
    } catch {
      return {}; // Si la réponse est vide ou ne peut pas être parsée, retournez un objet vide
    }
  });
};
export const convertDate = (value) => {
  try {
    if (value === null || value === undefined) return null
    return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
  }
  catch (e) {
    console.log(e);
    return null
  }
}
export const renderDate = (timestamp) => {
  return convertDate(timestamp)
}

export function interpolateColor(color1, color2, factor = 0.5) {
  const hex = (color) => parseInt(color.substring(1), 16);
  const r = (color) => (color >> 16) & 0xff;
  const g = (color) => (color >> 8) & 0xff;
  const b = (color) => color & 0xff;

  const color1Hex = hex(color1);
  const color2Hex = hex(color2);

  const red1 = r(color1Hex);
  const green1 = g(color1Hex);
  const blue1 = b(color1Hex);

  const red2 = r(color2Hex);
  const green2 = g(color2Hex);
  const blue2 = b(color2Hex);

  // const deltaRed = (red2 - red1) / visualSpace.length;
  // const deltaGreen = (green2 - green1) / visualSpace.length;
  // const deltaBlue = (blue2 - blue1) / visualSpace.length;

  const red = Math.round(red1 + factor * (red2 - red1));
  const green = Math.round(green1 + factor * (green2 - green1));
  const blue = Math.round(blue1 + factor * (blue2 - blue1));

  const interpolateHex = (red, green, blue) => `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;

  return interpolateHex(red, green, blue);
}
// Trouver la couleur Tailwind la plus proche
export const findClosestTailwindColor = (colorHex) => {
  const tailwindColors = {
    red: ['#ef4444'],
    blue: ['#3b82f6'],
    green: ['#22c55e'],
    purple: ['#8b5cf6'],
    yellow: ['#facc15'],
    // Ajoutez d'autres couleurs selon les besoins
  };
  // Convertir Hex en RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  // Calculer la distance entre deux couleurs
  const colorDistance = (color1, color2) => {
    let [r1, g1, b1] = hexToRgb(color1);
    let [r2, g2, b2] = hexToRgb(color2);
    return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
  };
  let closestColor = '';
  let smallestDistance = Number.MAX_VALUE;

  Object.entries(tailwindColors).forEach(([tailwindColor, shades]) => {
    shades.forEach(shade => {
      let distance = colorDistance(colorHex, shade);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestColor = tailwindColor;
      }
    });
  });

  return closestColor;
};