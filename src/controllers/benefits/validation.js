const { body } = require('express-validator')
const { cpf } = require('cpf-cnpj-validator')

exports.validateUserData = [
  body('user').isString({ min: 6 }).withMessage('Invalid user!'),
  body('password').isString({ min: 6 }).withMessage('Invalid password!'),
  body('cpf').custom((userCPF) => cpf.isValid(userCPF)).withMessage('Invalid CPF!')
]
