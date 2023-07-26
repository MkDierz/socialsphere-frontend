import stringToColor from './stringToColor';

export default function stringAvatar(name) {
  const nameSplit = name.split(' ');
  const children = nameSplit.map((l) => l[0].toUpperCase()).join('') || '';
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children,
  };
}
