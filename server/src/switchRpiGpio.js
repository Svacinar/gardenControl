const { Gpio } = require('onoff');

const LED = [];
LED[0] = new Gpio(2, 'out');
LED[1] = new Gpio(3, 'out');

LED[0].writeSync(1);
LED[1].writeSync(1);

function switchRpiGpio(valve, boolean) {
  if (valve === 'valve1') {
    LED[0].writeSync(boolean);
  } else if (valve === 'valve2') {
    LED[1].writeSync(boolean);
  } else {
    console.log('valve not found');
  }
}

module.exports.switchRpiGpio = switchRpiGpio;
