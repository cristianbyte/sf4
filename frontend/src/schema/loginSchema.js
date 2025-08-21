import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('El email es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria')
});

export default loginSchema;