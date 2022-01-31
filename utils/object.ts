export const flat = (
  object: unknown,
  previousValue: Record<string, unknown> = {},
  key = ""
): Record<string, unknown> =>
  Object.entries(object).reduce((acc, curr) => {
    if (typeof curr[1] === "object") {
      flat(curr[1], acc, curr[0]);
    } else {
      acc[getKey(key, curr[0])] = curr[1];
    }

    return acc;
  }, previousValue);

const getKey = (name: string, key: string) => (name ? `${name}-${key}` : key);
