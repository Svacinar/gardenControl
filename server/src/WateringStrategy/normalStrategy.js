class NormalStrategy {
  constructor() {
    this.name = 'normalStrategy';
    this.timer = 1.8e+6;
    this.waterringSchedule = '0 6 * * 2,6';
  }

  returnParameters() {
    return [this.name, this.timer, this.waterringSchedule];
  }
}

module.exports = new NormalStrategy();
