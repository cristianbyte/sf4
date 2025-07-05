import User from '../models/User.js'

export const create = async (userData) => {
  try {
    const newUser = await User.create(userData)
    return newUser
  } catch (error) {
    // Aquí puedes manejar errores específicos si quieres
    throw new Error('Error al crear el usuario: ' + error.message)
  }
}