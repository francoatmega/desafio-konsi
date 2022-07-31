const { validatePermission } = require('../../appServices/authentication')
const { validateErrorBody } = require('../../appServices/handleError')
const { validateUserData } = require('./validation')

exports.path = '/benefits'
exports.method = 'get'
exports.middleware = [validatePermission, validateUserData, validateErrorBody]

exports.handler = async (req, res, next) => {
  try {
    return res.status(200).json({})
  } catch (err) {
    next(err)
  }
}
