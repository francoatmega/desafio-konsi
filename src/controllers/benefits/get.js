const { validatePermission } = require('../../appServices/authentication')
const { validateErrorBody } = require('../../appServices/handleError')
const { validateUserData } = require('./validation')
const getBenefits = require('../../services/getBenefits')
const { INTERNAL_SERVER_ERROR } = require('../../helpers/httpConstants')

exports.path = '/benefits'
exports.method = 'get'
exports.middleware = [validatePermission, validateUserData, validateErrorBody]

exports.handler = async (req, res) => {
  try {
    const benefits = await getBenefits({
      username: req.body.user,
      password: req.body.password,
      cpf: req.body.cpf
    })

    if (benefits[0] === 'Matrícula não encontrada!') {
      return res.status(204).json()
    }

    return res.status(200).json({ beneficios: benefits })
  } catch (err) {
    // Log this error in some error logging tool
    // Sentry could be a good option
    return res.status(INTERNAL_SERVER_ERROR.status).json(INTERNAL_SERVER_ERROR.response)
  }
}
