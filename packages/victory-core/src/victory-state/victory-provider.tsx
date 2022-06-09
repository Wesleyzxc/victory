import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { ForAxes } from "../types";
import { VictoryProviderProps } from "./types";
import { FormattedDatum, useData } from "./use-data";
import { useDomain } from "./use-domain";
import { useRange } from "./use-range";
import { useScale } from "./use-scale";
import { ScaleLinear } from "victory-vendor/d3-scale";

// TODO: fix D3Scale type
type D3Scale = ScaleLinear<number, number>;

interface ContextType {
  data: FormattedDatum[];
  scale: Required<ForAxes<D3Scale>>;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({ children, ...props }: VictoryProviderProps) {
  // TODO: Get data
  const xDomain = useDomain(props, "x");
  const yDomain = useDomain(props, "y");
  const domain = { x: xDomain, y: yDomain };

  const xRange = useRange(props, "x");
  const yRange = useRange(props, "y");

  const xBaseScaleFn: D3Scale = useScale(props, "x");
  const yBaseScaleFn: D3Scale = useScale(props, "y");

  const xScaleFn = xBaseScaleFn().domain(xDomain).range(xRange);
  const yScaleFn = yBaseScaleFn().domain(yDomain).range(yRange);

  const scale = {
    x: xScaleFn,
    y: yScaleFn
  };

  const data = useData(props, domain);

  const value = {
    scale,
    data
  };

  return (
    <VictoryContext.Provider value={value}>{children}</VictoryContext.Provider>
  );
}

export function useVictoryContext() {
  const context = useContextSelector<ContextType | null, ContextType | null>(
    VictoryContext,
    (c) => c
  );

  if (!context) {
    throw new Error("useVictoryState must be used within a VictoryProvider");
  }

  return context;
}
