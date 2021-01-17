const app = require('../app')
const request = require('supertest')

describe('API test suite', () => {
  process.env.NODE_ENV = 'test'

  beforeAll(async() => {})

  it('Tests base route', (done) => {
    request(app)
      .get('/')
      .expect(404, done)
  })

  it('Tests shortenUrl endpoint with no params', (done) => {
    request(app)
      .post('/api/shorten')
      .expect(422, done)
  })

  it('Tests shortenUrl endpoint with incorrect URL', (done) => {
    request(app)
      .post('/api/shorten')
      .send({ url: 'incorrect url value' })
      .expect(422, done)
  })

  it('Tests shortenUrl endpoint with correct URL', (done) => {
    request(app)
      .post('/api/shorten')
      .send({ url: 'https://google.com' })
      .expect(200, done)
  })

  it('Tests shortenUrl endpoint with fixed slug (shortId)', (done) => {
    request(app)
      .post('/api/shorten')
      .send({ url: 'https://google.com', fixedSlug: true })
      .expect(200, done)
  })

  it('Tests shortenUrl endpoint with fixed slug (shortId) to simulate duplicate', (done) => {
    request(app)
      .post('/api/shorten')
      .send({ url: 'https://google.com', fixedSlug: true })
      .expect(200, done)
  })

  it('Tests shortenUrl endpoint with correct, long URL', (done) => {
    request(app)
      .post('/api/shorten')
      .send({
        url: 'https://www.google.com/search?q=stord&sxsrf=ALeKk00prURxA2x0lW2815zKxzpRjM_A-w:1610825108171&' +
          'source=lnms&tbm=isch&sa=X&ved=2ahUKEwiLmviSl6HuAhXspIsKHbFWAu8Q_AUoAnoECA4QBA&biw=1792&bih=1016'
      })
      .expect(200, done)
  })

  it('Tests redirect with incorrect URL', (done) => {
    request(app)
      .get('/incorrect_url')
      .expect(404, done)
  })

  it('Tests redirect with correct, existing URL', (done) => {
    request(app)
      .get('/test')
      .expect(302, done)
  })

  afterAll(async () => {
    // Uncomment below line to drop test db when done testing
    // await app.db.drop()

    await app.db.disconnect()
  })
})
