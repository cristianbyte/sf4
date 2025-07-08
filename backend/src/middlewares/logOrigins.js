export function logOrigin(req, res, next) {
  const origin = req.headers.origin || '[no origin]';
  console.log(`🌐 [${req.method}] ${req.originalUrl} — FROM: ${origin}`);
  next();
}