const eventEmitter = require('events');

class DataMonitor extends eventEmitter {
    logLevel = 'DDEV'
}

module.exports = DataMonitor;