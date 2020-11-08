const mongoose = require('mongoose');

const WateringScheduleSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('watering', WateringScheduleSchema);