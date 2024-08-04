const reservation = require("../models/reservation.model");
require("dotenv").config();
async function getReservations(req, rep) {
  try {
    const reservations = await reservation.find();
    if (reservations.length === 0) {
      return rep.status(404).send("No reservation found");
    }
    rep.send(reservations);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function getReservation(req, rep) {
  try {
    const reservationResult = await reservation.findById(req.params.id);
    if (!reservationResult) {
      return rep.status(404).send("Reservation not found");
    }
    rep.send(reservationResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function updateReservation(req, rep) {
  try {
    const updatedReservation = await reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedReservation) {
      return rep.status(404).send("Reservation not found");
    }
    rep.send(updatedReservation);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function addReservation(req, rep) {
  try {
    const newReservation = new reservation(req.body);
    const newReservationResult = await newReservation.save();
    rep.send(newReservationResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

/*async function removeReservation(req, rep) {
  try {
    const deletedReservation = await reservation.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedReservation) {
      return rep.status(404).send("Reservation not found");
    }
    rep.status(203).send("");
  } catch (error) {
    rep.status(500).send(error);
  }
}*/

module.exports = {
  getReservations,
  addReservation,
  updateReservation,
  getReservation,
};
