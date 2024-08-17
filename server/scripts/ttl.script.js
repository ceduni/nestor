const cron = require("node-cron");
const mongoose = require("mongoose");
const space = require("../src/models/space.model").space;
const reservation = require("../src/models/reservation.model");
const current = new Date();

const reservationTask = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const reservations = await reservation.find();
      if (!reservations) {
        console.log("No reservation found");
      } else {
        reservations.forEach((reservation) => {
          const endTime = reservation.availability.endAt;
          if (
            current.getTime() > endTime.getTime() &&
            reservation.status === "confirmed"
          ) {
            reservation.status = "fulfilled";
            reservation.save();
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  {
    scheduled: false,
  },
);

const spaceTask = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const spaces = await space.find();
      if (!spaces) {
        console.log("No space found");
      } else {
        spaces.forEach((space) => {
          space.availabilities.forEach((avail) => {
            if (avail.endAt.getTime() < current.getTime()) {
              space.availabilities.pull(avail._id);
            }
          });
          space.save();
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  { scheduled: false },
);

module.exports = { reservationTask, spaceTask };
