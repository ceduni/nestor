// reservation.service.test.js
const reservationService = require("../services/reservation.service");
const reservationModel = require("../models/reservation.model");

jest.mock("../models/reservation.model");

describe("Reservation Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getReservations", () => {
    it("should retrieve all reservations", async () => {
      const mockReservations = [{ id: "1", name: "Reservation 1" }];
      reservationModel.find.mockResolvedValue(mockReservations);

      const req = {};
      const rep = { send: jest.fn() };

      await reservationService.getReservations(req, rep);

      expect(reservationModel.find).toHaveBeenCalled();
      expect(rep.send).toHaveBeenCalledWith(mockReservations);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error fetching reservations");
      reservationModel.find.mockRejectedValue(mockError);

      const req = {};
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await reservationService.getReservations(req, rep);

      expect(reservationModel.find).toHaveBeenCalled();
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getReservation", () => {
    it("should retrieve a reservation by id", async () => {
      const mockReservation = { id: "1", name: "Reservation 1" };
      reservationModel.findById.mockResolvedValue(mockReservation);

      const req = { params: { id: "1" } };
      const rep = { send: jest.fn() };

      await reservationService.getReservation(req, rep);

      expect(reservationModel.findById).toHaveBeenCalledWith("1");
      expect(rep.send).toHaveBeenCalledWith(mockReservation);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error fetching reservation");
      reservationModel.findById.mockRejectedValue(mockError);

      const req = { params: { id: "1" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await reservationService.getReservation(req, rep);

      expect(reservationModel.findById).toHaveBeenCalledWith("1");
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("addReservation", () => {
    it("should add a new reservation", async () => {
      const mockReservation = { name: "New Reservation" };
      const savedReservation = { id: "1", ...mockReservation };
      reservationModel.prototype.save.mockResolvedValue(savedReservation);

      const req = { body: mockReservation };
      const rep = { send: jest.fn() };

      await reservationService.addReservation(req, rep);

      expect(reservationModel.prototype.save).toHaveBeenCalled();
      expect(rep.send).toHaveBeenCalledWith(savedReservation);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error adding reservation");
      reservationModel.prototype.save.mockRejectedValue(mockError);

      const req = { body: { name: "New Reservation" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await reservationService.addReservation(req, rep);

      expect(reservationModel.prototype.save).toHaveBeenCalled();
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("updateReservation", () => {
    it("should update a reservation", async () => {
      const mockReservation = { id: "1", name: "Updated Reservation" };
      reservationModel.findByIdAndUpdate.mockResolvedValue(mockReservation);

      const req = { params: { id: "1" }, body: mockReservation };
      const rep = { send: jest.fn() };

      await reservationService.updateReservation(req, rep);

      expect(reservationModel.findByIdAndUpdate).toHaveBeenCalledWith("1", mockReservation, { new: true });
      expect(rep.send).toHaveBeenCalledWith(mockReservation);
    });

    it("should return 404 if reservation not found", async () => {
      reservationModel.findByIdAndUpdate.mockResolvedValue(null);

      const req = { params: { id: "1" }, body: { name: "Updated Reservation" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await reservationService.updateReservation(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("Reservation not found");
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error updating reservation");
      reservationModel.findByIdAndUpdate.mockRejectedValue(mockError);

      const req = { params: { id: "1" }, body: { name: "Updated Reservation" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await reservationService.updateReservation(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("removeReservation", () => {
    it("should delete a reservation", async () => {
      reservationModel.findByIdAndDelete.mockResolvedValue(true);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await reservationService.removeReservation(req, rep);

      expect(reservationModel.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(rep.status).toHaveBeenCalledWith(203);
      expect(rep.send).toHaveBeenCalledWith("");
    });

    it("should return 404 if reservation not found", async () => {
      reservationModel.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await reservationService.removeReservation(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("Reservation not found");
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error deleting reservation");
      reservationModel.findByIdAndDelete.mockRejectedValue(mockError);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await reservationService.removeReservation(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });
});
