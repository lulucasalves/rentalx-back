const redis = require('redis')
const { RateLimiterRedis } = require('rate-limiter-flexible')
require('dotenv/config')

async function redisRateLimiter(request, response, next) {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  })

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 5,
    duration: 5
  })
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (err) {
    return response
      .status(429)
      .json({ error: true, message: 'Too many requests' })
  }
}

module.exports = redisRateLimiter
