const { createLogger, format, transports } = require('winston')
const { combine, timestamp, errors, json, label, printf } = format

const myFormat = printf(infos => {
  const user = infos[Symbol.for('splat')]
  if (user) {
    return `${infos.timestamp} [${user.name}] - ${infos.stack}`
  } else {
    return `${infos.timestamp} [${infos.label}] - ${infos.stack}`
  }
})

const logger = createLogger({
    format: combine(
        errors({ stack: true }),
        label({ label: 'error' }),
        json(),
        timestamp({format: '[on] YYYY-MM-DD [at] HH:mm'}),
        myFormat
    ),
    transports: [
        new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new transports.File({ filename: 'src/logs/info.log', level: 'info' })
    ],
})
 
module.exports = logger