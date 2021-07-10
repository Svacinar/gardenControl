const cronManager = require('../Services/cronManager');
const wateringScheduleSchema = require('../Models/wateringScheduleSchema');

exports.postSchedule = async (req, res) => {
    const { name, duration, scheduledDate, description } = req.body;
    const id = new Date().getTime().toString(36);
    console.log(id);
    const durationInMilis = duration * 60000;
    const newSchedule = new wateringScheduleSchema({
        id: id,
        name: name,
        duration: durationInMilis,
        scheduledDate: scheduledDate,
        description: description
    });
    try {
        await newSchedule.save();
        cronManager.addSchedule(
            id,
            name,
            duration,
            scheduledDate,
            description
        )
        console.log("Schedule Saved to DB");
        res.status(201).redirect('/');

    } catch (error) {
        console.log(error);
        console.log("Something went wrong!");
        res.status(400).send(error);

    }

}
exports.findNearestSchedule = (req, res) => {
    const time = new Date();
    wateringScheduleSchema.find({ "scheduledDate": { $gte: time } }).sort({ 'scheduledDate': 1 }).limit(1).exec(function (error, todo) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        } else {
            console.log("DB searched");
            res.status(200).send({ data: todo });
        }
    })

}

exports.getAllSchedules = (req, res) => {
    wateringScheduleSchema.find().exec(function (error, todo) {
        if (error) {
            console.log(error);
        } else {
            console.log("all DB data returned");
            res.send({ data: todo });
        }
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        console.log("undefined, error")
        return
    }
    wateringScheduleSchema.findOneAndDelete({ "id": id }).exec(function (error, event) {
        if (error) {
            res.status(400).send(error);
        } else {
            console.log("DB searched" + event);
            res.status(200)
        }
    })
    cronManager.scheduleStop(id);
}