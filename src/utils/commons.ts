/**
 * Retrieve a random integer between min and max inclusively
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export default function randomIntFromInterval(
  min: number,
  max: number,
) {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
}
