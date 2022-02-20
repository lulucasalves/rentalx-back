const express = require('express')
const cors = require('cors')
const app = express()
require('../config/database/database')
const router = require('./routers')
const redisRateLimiter = require('../middlewares/RedisRateLimiter')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

app.use(redisRateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())

app.use(cors())
app.use(router)

app.use(Sentry.Handlers.errorHandler())

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

module.exports = app
