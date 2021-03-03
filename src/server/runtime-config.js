const isDevMode = process.env.NODE_ENV !== 'production';

const runtimeConfig = {
  isDevMode,
  host: 'localhost',
  port: 3000,
};

export { runtimeConfig };
