class NewSeedStrategy {
  constructor() {
    this.name = 'newSeedStrategy';
    this.timer = 180000; // ms
    this.waterringSchedule = '0 8,10,12,13,15,17 * * *';
  }

  returnParameters() {
    return [this.name, this.timer, this.waterringSchedule];
  }
}

module.exports = new NewSeedStrategy();
