const axios = require('axios')

const authToken = {
  token: null,
  expiration: null
}

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

module.exports = async ({ username, password, cpf }) => {
  if (!authToken.token || Date.now() >= Number(authToken.expiration)) {
    const data = await axios({
      method: 'post',
      url: 'http://extratoblubeapp-env.eba-mvegshhd.sa-east-1.elasticbeanstalk.com/login',
      data: {
        login: username,
        senha: password
      }
    })

    const jwt = parseJwt(data.headers.authorization)

    authToken.token = data.headers.authorization
    authToken.expiration = jwt.exp * 1000
  }

  const benefitsData = await axios({
    method: 'get',
    url: `http://extratoblubeapp-env.eba-mvegshhd.sa-east-1.elasticbeanstalk.com/offline/listagem/${cpf}`,
    headers: {
      authorization: authToken.token
    }
  })

  return benefitsData.data?.beneficios?.map(item => item.nb)
}
