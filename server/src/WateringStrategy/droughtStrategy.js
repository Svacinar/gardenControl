class DroughtStrategy {
  constructor() {
    this.name = 'droughtStrategy';
    this.timer = 3e+6;
    this.waterringSchedule = '0 6 * * 2,6';
  }

  returnParameters() {
    return [this.name, this.timer, this.waterringSchedule];
  }
}

module.exports = new DroughtStrategy();
