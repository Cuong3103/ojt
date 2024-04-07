export function createEnum<T extends string>(values: T[]): { [K in T]: K } {
  return values.reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {} as { [K in T]: K });
}
