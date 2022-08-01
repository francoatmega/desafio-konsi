const app = require('../../../app')
const supertest = require('supertest')
const requestHandler = require('../../../src/appServices/request')
const req = supertest(app)

beforeAll(async () => {
  process.env.API_SECRET = 'dd0cf380-1063-4bbb-b1bf-25daeb64826a'
})

describe('Test get benefits route', () => {
  it('should return status code 401 when no api token is passed', async () => {
    jest.spyOn(requestHandler, 'request').mockImplementation(() => {
      return {
        status: 500,
        data: {}
      }
    })
    const { statusCode } = await req.get('/api/benefits')
    expect(statusCode).toBe(401)
  })
  it('should return status code 500 when an internal error occur', async () => {
    jest.spyOn(requestHandler, 'request').mockImplementation(() => {
      return {
        status: 500,
        data: {}
      }
    })
    const { statusCode } = await req.get('/api/benefits')
      .set('Authorization', `Bearer ${process.env.API_SECRET}`)
      .send({
        user: 'RodGom21',
        password: 'konsi2022*',
        cpf: '18966470491'
      })
    expect(statusCode).toBe(500)
  })
  it('should return benefits when passed a valid CPF number', async () => {
    jest.spyOn(requestHandler, 'request').mockImplementationOnce(() => {
      return {
        status: 200,
        data: {
          headers: {
            authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJVc2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjU5Mzk0NTAxfQ.AkyHpVkNVp2HGH8r5bnMfp97nWyR5ztNmA30O5feLjU'
          }
        }
      }
    }).mockImplementationOnce(() => {
      return {
        status: 200,
        data: {
          beneficios: [
            {
              nb: '9849085493853'
            },
            {
              nb: '8723487382474'
            }
          ]
        }
      }
    })
    const { statusCode, body } = await req.get('/api/benefits')
      .set('Authorization', `Bearer ${process.env.API_SECRET}`)
      .send({
        user: 'RodGom21',
        password: 'konsi2022*',
        cpf: '18966470491'
      })
    expect(statusCode).toBe(200)
    expect(body).toEqual({
      beneficios: [
        '9849085493853',
        '8723487382474'
      ]
    })
  })
  it('should return that no benefit was finded when pass a CPF without benefit', async () => {
    jest.spyOn(requestHandler, 'request').mockImplementationOnce(() => {
      return {
        status: 200,
        data: {
          headers: {
            authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJVc2VybmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNjU5Mzk0NTAxfQ.AkyHpVkNVp2HGH8r5bnMfp97nWyR5ztNmA30O5feLjU'
          }
        }
      }
    }).mockImplementationOnce(() => {
      return {
        status: 200,
        data: {
          beneficios: [
            {
              nb: 'Matrícula não encontrada!'
            }
          ]
        }
      }
    })
    const { statusCode } = await req.get('/api/benefits')
      .set('Authorization', `Bearer ${process.env.API_SECRET}`)
      .send({
        user: 'RodGom21',
        password: 'konsi2022*',
        cpf: '18966470491'
      })
    expect(statusCode).toBe(204)
  })
})
