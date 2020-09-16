const fs = require('fs');

function switchRpiGpio(valve, boolean) {
  try {
    const date = new Date().toISOString();
    const logMessage = `${date}, ${valve}, ${boolean}\n`;
    const stream = fs.createWriteStream('log.txt', { flags: 'a' });
    stream.write(logMessage, 'UTF8');
    stream.end();

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
  } catch (error) {

  }
}

module.exports.switchRpiGpio = switchRpiGpio;
