const getRandomInRange = (min: number = 0, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export { getRandomInRange };

export function removeFromArray(array: Array<string>, word: string) {
  const index = array.indexOf(word);
  if (index != -1) array.splice(index, 1);
}
