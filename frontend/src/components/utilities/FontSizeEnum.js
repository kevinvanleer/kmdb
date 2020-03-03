export const enumToSize = fontSize => {
  if (fontSize === 'title') {
    return '2rem';
  } else if (fontSize === 'heading') {
    return '1.5rem';
  } else if (fontSize === 'label') {
    return '1.25rem';
  } else if (fontSize === 'detail') {
    return '0.8rem';
  }
  return fontSize;
};

export default enumToSize;
