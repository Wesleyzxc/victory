/* eslint-disable max-nested-callbacks */
import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("useData", () => {
  it("returns an empty array if no data is passed in", () => {
    const { result } = renderHook(() => Hooks.useData({}));
    expect(result.current).toEqual([]);
  });

  it("returns formatted data", () => {
    const data = [
      { x: "kittens", y: 3 },
      { x: "cats", y: 5 }
    ];
    const { result } = renderHook(() => Hooks.useData({ data }));
    expect(result.current).toEqual([
      { _x: 1, x: "kittens", xName: "kittens", _y: 3, y: 3 },
      { _x: 2, x: "cats", xName: "cats", _y: 5, y: 5 }
    ]);
  });

  it("returns formatted data with accessors", () => {
    const data = [
      { one: "kittens", two: 3 },
      { one: "cats", two: 5 }
    ];
    const { result } = renderHook(() =>
      Hooks.useData({ data, x: "one", y: "two" })
    );
    expect(result.current).toEqual([
      {
        _x: 1,
        x: "kittens",
        xName: "kittens",
        _y: 3,
        y: 3,
        one: "kittens",
        two: 3
      },
      { _x: 2, x: "cats", xName: "cats", _y: 5, y: 5, one: "cats", two: 5 }
    ]);
  });

  it("does not sort data by default", () => {
    const data = [
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 3, y: 1 }
    ];
    const { result } = renderHook(() => Hooks.useData({ data }));

    expect(result.current).toEqual([
      { _x: 2, x: 2, _y: 2, y: 2 },
      { _x: 1, x: 1, _y: 3, y: 3 },
      { _x: 3, x: 3, _y: 1, y: 1 }
    ]);
  });

  it("sorts data according to sort key", () => {
    const data = [
      { x: 1, y: 1, order: 2 },
      { x: 3, y: 3, order: 1 },
      { x: 2, y: 2, order: 3 }
    ];

    const { result } = renderHook(() =>
      Hooks.useData({ data, sortKey: "order" })
    );

    expect(result.current).toEqual([
      { _x: 3, x: 3, _y: 3, y: 3, order: 1 },
      { _x: 1, x: 1, _y: 1, y: 1, order: 2 },
      { _x: 2, x: 2, _y: 2, y: 2, order: 3 }
    ]);
  });

  it("sorts data according to sort key and sort order", () => {
    const data = [
      { x: 1, y: 1, order: 2 },
      { x: 3, y: 3, order: 1 },
      { x: 2, y: 2, order: 3 }
    ];

    const { result } = renderHook(() =>
      Hooks.useData({ data, sortKey: "order", sortOrder: "descending" })
    );

    expect(result.current).toEqual([
      { _x: 2, x: 2, _y: 2, y: 2, order: 3 },
      { _x: 1, x: 1, _y: 1, y: 1, order: 2 },
      { _x: 3, x: 3, _y: 3, y: 3, order: 1 }
    ]);
  });

  describe("with domain", () => {
    it("generates a dataset from the domain if no data is passed in", () => {
      const expectedValues = [0, 10];
      const domain = { x: [0, 10], y: [0, 10] };
      const { result } = renderHook(() => Hooks.useData({}, domain));
      expect(result.current).toEqual(
        expectedValues.map((v) => ({ _x: v, x: v, _y: v, y: v }))
      );
    });

    it("generates a dataset from domain and samples", () => {
      const expectedValues = [0, 5, 10];
      const domain = {
        x: [0, 10],
        y: [0, 10]
      };
      const { result } = renderHook(() =>
        Hooks.useData({ samples: 2 }, domain)
      );
      expect(result.current).toEqual(
        expectedValues.map((v) => ({ _x: v, x: v, _y: v, y: v }))
      );
    });
  });
});
