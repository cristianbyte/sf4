export const validateSchema = (schemas) => (req, res, next) => {
  try {
    if (schemas.body) schemas.body.parse(req.body);
    if (schemas.params) schemas.params.parse(req.params);
    if (schemas.query) schemas.query.parse(req.query);
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors?.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })) || [],
    });
  }
};
