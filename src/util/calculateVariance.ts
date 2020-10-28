export const calculateAverage = (points: number[]): number => {
  return points.reduce((acc, cur) => acc + cur, 0) / points.length;
};

const calculateVariance = (points: number[], average?: number): number => {
  const ave = average || calculateAverage(points);

  return (
    points.reduce((acc, cur) => acc + (ave - cur) * (ave - cur), 0) /
    points.length
  );
};

export default calculateVariance;
