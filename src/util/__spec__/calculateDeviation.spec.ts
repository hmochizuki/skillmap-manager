import calculateDeviation, { calculateAverage } from "../calculateDeviation";

describe("calculateAverage", () => {
  test("50,60,30 の平均値が計算されること", () => {
    expect(calculateAverage([50, 60, 30])).toBe(140 / 3);
  });
});

describe("calculateDeviation", () => {
  describe("第二引数(average)を渡さない場合", () => {
    test("同じ数字の場合、標準偏差は0", () => {
      const points = [100, 100, 100];
      expect(calculateDeviation(points)).toBe(0);
    });
    test("10,20,30 の標準偏差は、8.16496580927726", () => {
      const points = [10, 20, 30];
      expect(calculateDeviation(points)).toBe(8.16496580927726);
    });
  });
  describe("第二引数(average)を渡す場合", () => {
    test("同じ数字の場合、標準偏差は0", () => {
      const points = [100, 100, 100];
      expect(calculateDeviation(points, calculateAverage(points))).toBe(0);
    });
    test("10,20,30 の標準偏差は、8.16496580927726", () => {
      const points = [10, 20, 30];
      expect(calculateDeviation(points, calculateAverage(points))).toBe(
        8.16496580927726
      );
    });
  });
});
