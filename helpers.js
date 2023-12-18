export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000) + 1;

  return `${timestamp}${random}`;
};
