const axios = require('axios')
let localServer, localApp;

const testDuration = 10  // in seconds

/*
Pretty naive, sequential performance test
 */

describe('Performance test suite', () => {
  process.env.NODE_ENV = 'test'
  process.env.PORT = 4000

  beforeAll(() => {
    const { server, app } = require('../index')
    localServer = server
    localApp = app
  })

  it(`tests shortener performance for ${testDuration} seconds`, async () => {
    let testDone = false;
    let doneRequests = 0;

    setTimeout(() => {
      testDone = true

      console.log('Performed requests: ' + doneRequests)
      console.log(`Rate: ${ doneRequests / testDuration } requests / second`)

      /*
      Verify against the requirement > 5 reqs/s
       */

      expect(doneRequests).toBeGreaterThanOrEqual(5)

    }, testDuration * 1000)

    while (!testDone) {
      await new Promise(resolve => {
        axios
          .post(
            'http://localhost:4000/api/shorten',
            {
              url: 'https://www.google.com/search?q=stord&sxsrf=ALeKk00prURxA2x0lW2815zKxzpRjM_A-w:1610825108171&' +
                'source=lnms&tbm=isch&sa=X&ved=2ahUKEwiLmviSl6HuAhXspIsKHbFWAu8Q_AUoAnoECA4QBA&biw=1792&bih=1016'
            }
          ).then(resolve).catch(console.error)
      })
      if (!testDone) {
        doneRequests++;
      }
    }
  }, (testDuration + 5) * 1000)

  afterAll(async () => {
    // Uncomment below line to drop test db when done testing
    // await localApp.db.drop()

    /*
    Unfortunately below does not work as expected causing 'A worker process has failed to exit gracefully' warning
     */

    localServer.close()
  })
})
