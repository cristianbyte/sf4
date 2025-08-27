import cors from 'cors';

const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4321',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];

const PROD_ORIGINS = [
  'https://coder.red',
  'https://sf4.coder.red'
];

const getAcceptedOrigins = () => {
  return process.env.NODE_ENV === 'production'
    ? PROD_ORIGINS
    : DEV_ORIGINS;
};

export const corsConfig = {
  origin: (origin, callback) => {
    const allowedOrigins = getAcceptedOrigins();
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};