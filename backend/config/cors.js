
const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4321',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://192.168.1.6:5173',
];

const PROD_ORIGINS = [
  'https://coder.red',
  'https://sf4.coder.red',
  'https://sf4.vercel.app',
  'https://streamfighters.lat',
  'https://sf4-n6rhgb23o-cristianbytes-projects.vercel.app'
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
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};