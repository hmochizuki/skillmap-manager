import calculateVariance, { calculateAverage } from "../calculateVariance";

describe("calculateAverage", () => {
  test("50,60,30 の平均値が計算されること", () => {
    expect(calculateAverage([50, 60, 30])).toBe(140 / 3);
  });
});

describe("calculateVariance", () => {
  describe("第二引数(average)を渡さない場合", () => {
    test("同じ数字の場合、分散は0", () => {
      const points = [100, 100, 100];
      expect(calculateVariance(points)).toBe(0);
    });
    test("10,20,30 の分散は、66.66666..", () => {
      const points = [10, 20, 30];
      expect(calculateVariance(points)).toBe(66.66666666666667);
    });
  });
  describe("第二引数(average)を渡す場合", () => {
    test("同じ数字の場合、分散は0", () => {
      const points = [100, 100, 100];
      expect(calculateVariance(points, calculateAverage(points))).toBe(0);
    });
    test("10,20,30 の分散は、66.66666..", () => {
      const points = [10, 20, 30];
      expect(calculateVariance(points, calculateAverage(points))).toBe(
        66.66666666666667
      );
    });
  });
});
