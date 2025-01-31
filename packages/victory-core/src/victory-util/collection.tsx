function isNonEmptyArray(collection) {
  return Array.isArray(collection) && collection.length > 0;
}

export function containsStrings<T>(collection: Array<T>) {
  return (
    Array.isArray(collection) &&
    collection.some((value) => typeof value === "string")
  );
}

export function containsDates(collection: Array<number | Date>): boolean {
  return (
    Array.isArray(collection) &&
    collection.some((value) => value instanceof Date)
  );
}

export function containsNumbers(collection) {
  return (
    Array.isArray(collection) &&
    collection.some((value) => typeof value === "number")
  );
}

export function containsOnlyStrings(collection) {
  return (
    isNonEmptyArray(collection) &&
    collection.every((value) => typeof value === "string")
  );
}

export function isArrayOfArrays(collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
}

export function removeUndefined(arr) {
  return arr.filter((el) => el !== undefined);
}

export function getMaxValue(
  arr: Array<number | Date>,
  ...values: Array<number | Date>
): number | Date {
  const array = arr.concat(values) as number[];
  return containsDates(array)
    ? new Date(Math.max(...array)) // Dates will be coerced to numbers
    : Math.max(...array);
}

export function getMinValue(
  arr: Array<number | Date>,
  ...values: Array<number | Date>
): number | Date {
  const array = arr.concat(values) as number[];
  return containsDates(array)
    ? new Date(Math.min(...array)) // Dates will be coerced to numbers
    : Math.min(...array);
}
