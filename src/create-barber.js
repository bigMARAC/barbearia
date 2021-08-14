const BarberController = require('./controllers/Barber')
var argv = require('yargs/yargs')(process.argv.slice(2)).argv
require('./database')

;(async () => {
  if (argv.name && argv.username && argv.password) {
    await BarberController.store(argv.name, argv.username, argv.password)
  } else {
    return console.log('Parâmetros inválidos')
  }
})()
