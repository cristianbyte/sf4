import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('El email es obligatorio'),
  username: yup
    .string()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(20, 'El username no puede tener más de 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos')
    .required('El username es obligatorio'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Debe contener al menos: 1 mayúscula, 1 minúscula y 1 número')
    .required('La contraseña es obligatoria')
});

export default registerSchema;