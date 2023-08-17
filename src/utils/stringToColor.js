export default function stringToColor(string) {
  try {
    if (typeof string !== 'string' || string.trim() === '') {
      throw new Error('Invalid input: String must be a non-empty string.');
    }

    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 255;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  } catch (error) {
    console.error('Error in stringToColor:', error.message);
    return '#000000'; // Return a default color or appropriate response.
  }
}
