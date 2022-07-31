const app = require('../../../app')
const supertest = require('supertest')
const requestHandler = require('../../../src/appServices/request')
const req = supertest(app)

beforeAll(async () => {
  process.env.API_SECRET = 'dd0cf380-1063-4bbb-b1bf-25daeb64826a'
})

describe('Test get benefits route', () => {
  it.todo('should return status code 401 when no api token is passed')
  it.todo('should return status code 500 when an internal error occur')
  it.todo('should return benefits when passed a valid CPF number')
  it.todo('should return that no benefit was finded when pass a CPF without benefit')
})
