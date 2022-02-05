const getRandomInRange = (min: number = 0, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export { getRandomInRange };
