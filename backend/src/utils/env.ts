// NODE_ENV is a variable used by Express to configure runtime behaviour.
export const isTesting = process.env.NODE_ENV === 'test';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = !isTesting && !isDevelopment;
