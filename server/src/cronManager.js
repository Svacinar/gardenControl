const { CronJob, job } = require('cron');

const schedule = require('node-schedule');

const strategyManager = require('./WateringStrategy/strategyManager');
const valveManager = require('./valveManager');

class CronManager {
  constructor() {
    this.activeStrategies = {};
    this.activeSchedules = {};
  }

  cronAPI() {
    const response = {};
    for (const key in this.activeStrategies) {
      const nextDate = this.nextDate(key);
      this.activeStrategies[key].nextDate = nextDate;
      const { cron, ...other } = this.activeStrategies[key];
      response[key] = { ...other };
    }
    return response;
  }

  TESTadd(id, name, duration, date, description) {
    console.log("in TESTadd");
    console.log(...arguments);
    const handleCronShedule = function (duration) {
      console.log("handle cron function outer scope");
      return function () {
        console.log("handle cron schedule inner scope")
        valveManager.handleCronSchedule(duration);
      };
    };
    this.activeSchedules[id] = {
      name,
      duration,
      date,
      description,
      cron: schedule.scheduleJob(
        date,
        handleCronShedule(duration)
      )
    };

  }

  scheduleStop(id) {
    this.activeSchedules[id].cron.cancel();
    delete this.activeSchedules[id];
  }

  add(strategy, timer, waterringSchedule, strategyID) {
    const handleCronShedule = function (timer) {
      return function () {
        valveManager.handleCronSchedule(timer);
      };
    };
    this.activeStrategies[strategyID] = {
      strategy,
      timer,
      waterringSchedule,
      strategyID,
      cron: new CronJob(
        waterringSchedule,
        handleCronShedule(timer),
        true,
      ),
    };
  }

  stop(strategyID) {
    if (!this.activeStrategies.hasOwnProperty(strategyID)) {
      Object.keys(this.activeStrategies).forEach(strategy => {
        this.activeStrategies[strategy].cron.stop();
      });
      this.activeStrategies = {};
      return
    }
    this.activeStrategies[strategyID].cron.stop();
    delete this.activeStrategies[strategyID];
  }

  list() {
    return this.activeStrategies;
  }

  lastDate(strategyID) {
    return this.activeStrategies[strategyID].cron.lastDate();
  }

  nextDate(strategyID) {
    return this.activeStrategies[strategyID].cron.nextDates();
  }

  handleCron(state, strategy, strategyID) {
    if (!state) {
      this.stop(strategyID);
      return;
    }
    const strategyParameters = strategyManager.getStrategy(strategy).returnParameters();
    this.add(...strategyParameters, strategyID);
  }
}

const cronManager = new CronManager();

module.exports = cronManager;
