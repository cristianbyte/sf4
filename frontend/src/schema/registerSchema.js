import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('El email es obligatorio'),
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos')
    .required('El nombre es obligatorio'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos: 1 mayúscula, 1 minúscula y 1 número')
    .required('La contraseña es obligatoria')
});

export default registerSchema;