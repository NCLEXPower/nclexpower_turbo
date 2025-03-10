export const cacheKeyFor = (...args: any[]): string =>
  args.map((item) => (item ? item.toString() : "")).join("-");
