const fs = require('fs');
const axios = require('axios');

async function handleRaspberry(valve, boolean, timer) {

  const { Gpio } = require('onoff');
  const LED = [];
  LED[0] = new Gpio(2, 'out');
  LED[1] = new Gpio(3, 'out');
  LED[0].writeSync(1);
  LED[1].writeSync(1);
  if (valve === 'valve1') {
    LED[0].writeSync(boolean);
  } else if (valve === 'valve2') {
    LED[1].writeSync(boolean);
  }


}
async function handleArduino(valve, state, timer) {
  const valveId = valve.split('valve')[1] - 1;
  await axios.post(`${process.env.ARDUINO_IP}/valve`, {
    valveId,
    state,
    timer
  });
}

function logger(valve, boolean, timer) {
  const date = new Date().toISOString();
  const logMessage = `${date}, ${valve}, ${boolean}\n`;
  const stream = fs.createWriteStream('log.txt', { flags: 'a' });
  stream.write(logMessage, 'UTF8');
  stream.end();
}

async function gpioService(valve, boolean, timer) {
  const environment = process.env.ENVIRONMENT;

  if (environment === 'arduino') {
    await handleArduino(valve, boolean, timer);

  }
  if (environment === 'raspberry') {
    await handleRaspberry(valve, boolean, timer);
  }
  logger(valve, boolean, timer);
}

module.exports.gpioService = gpioService;
