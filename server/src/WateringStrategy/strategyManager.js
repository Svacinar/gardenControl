const newSeedStrategy = require('./newSeedStrategy');
const normalStrategy = require('./normalStrategy');
const droughtStrategy = require('./droughtStrategy');

class StrategyManager {
  constructor() {
    this.strategies = [];
  }

  addStrategy(strategy) {
    this.strategies = [...this.strategies, strategy];
  }

  getStrategy(name) {
    return this.strategies.find((strategy) => strategy.name === name);
  }
}

const strategyManager = new StrategyManager();

strategyManager.addStrategy(newSeedStrategy);
strategyManager.addStrategy(normalStrategy);
strategyManager.addStrategy(droughtStrategy);

module.exports = strategyManager;
