/**
 * Retrieve a random integer between min and max inclusively
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntFromInterval(
  min: number,
  max: number,
) : number {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
}

/**
 * Retrieve a random integer between min and max inclusively
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getMutipleRandomInt(
  min: number,
  max: number,
  size: number,
): number[] {
  const result: number[] = [];
  for (let i = 0; i < size; i += 1) {
    result.push(randomIntFromInterval(min, max));
  }
  return result;
}
