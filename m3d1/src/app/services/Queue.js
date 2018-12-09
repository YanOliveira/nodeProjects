const kue = require('kue')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')
const sentry = require('@sentry/node')

const queue = kue.createQueue({
  redis: redisConfig
})

queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)
queue.on('error', sentry.captureException)

module.exports = queue
