export const valueToString = (value: any) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  try {
    return value.toString();
  } catch (error) {
    return JSON.stringify(value);
  }
};
