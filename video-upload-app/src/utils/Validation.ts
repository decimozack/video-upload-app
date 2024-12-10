export const isValidPostalCode = (postalCode: string) =>
  /^\d{6}$/.test(postalCode);
