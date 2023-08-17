import stringToColor from './stringToColor';

export default function stringAvatar(name) {
  try {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid input: Name must be a non-empty string.');
    }

    const nameSplit = name.split(' ');

    if (nameSplit.length === 0) {
      throw new Error('Invalid input: Name must contain at least one word.');
    }

    const children = nameSplit.map((l) => l[0].toUpperCase()).join('') || name[0] || '?';

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children,
    };
  } catch (error) {
    console.error('Error in stringAvatar:', error.message);

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: '?',
    };
  }
}
