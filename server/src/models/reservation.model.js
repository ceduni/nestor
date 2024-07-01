const mongoose = require("mongoose");
const availabilitySchema = require("./space.model").availabilitySchema
const reservationSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    availability: availabilitySchema,
    guests: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    activity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["fulfilled", "confirmed", "pending", "cancelled"]
    },
    isPrivate : {
        type: Boolean,
        required: true
    }
});

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = reservation;