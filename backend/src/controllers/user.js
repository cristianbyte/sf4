import * as userService from '../services/user.js'

export const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err)
  }
}

export const logIn = async (req, res, next) => {
  try{
    const acces = await userService.login(req.body);
    res.status(200).json(acces);
  }catch (err){
    next(err)
  }
}

export const destroyUser = async (req, res, next) => {
  try {
    await userService.destroy(req.params.id);
    res.status(204).send()
  }catch{
    next(err)
  }
}