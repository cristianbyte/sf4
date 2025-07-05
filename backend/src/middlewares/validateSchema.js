import { ZodError } from 'zod'

export const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)

  if (!result.success) {
    const formattedErrors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))

    return res.status(400).json({
      error: 'Validation failed',
      details: formattedErrors
    })
  }

  req.body = result.data // ← datos ya validados y transformados
  next()
}
