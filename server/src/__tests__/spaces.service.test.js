// space.service.test.js
const spaceService = require("../services/space.service");
const spaceModel = require("../models/space.model").space;
const mongoose = require("mongoose");

jest.mock("../models/space.model");

describe("Space Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSpaces", () => {
    it("should retrieve all available spaces", async () => {
      const mockSpaces = [{ id: "1", name: "Space 1" }];
      spaceModel.find.mockResolvedValue(mockSpaces);

      const req = {};
      const rep = { send: jest.fn() };

      await spaceService.getSpaces(req, rep);

      expect(spaceModel.find).toHaveBeenCalledWith({ isAvailable: true });
      expect(rep.send).toHaveBeenCalledWith(mockSpaces);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error fetching spaces");
      spaceModel.find.mockRejectedValue(mockError);

      const req = {};
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.getSpaces(req, rep);

      expect(spaceModel.find).toHaveBeenCalledWith({ isAvailable: true });
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getSpace", () => {
    it("should retrieve a space by id", async () => {
      const mockSpace = { id: "1", name: "Space 1" };
      spaceModel.findById.mockResolvedValue(mockSpace);

      const req = { params: { id: "1" } };
      const rep = { send: jest.fn() };

      await spaceService.getSpace(req, rep);

      expect(spaceModel.findById).toHaveBeenCalledWith("1");
      expect(rep.send).toHaveBeenCalledWith(mockSpace);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error fetching space");
      spaceModel.findById.mockRejectedValue(mockError);

      const req = { params: { id: "1" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.getSpace(req, rep);

      expect(spaceModel.findById).toHaveBeenCalledWith("1");
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("addSpace", () => {
    it("should add a new space", async () => {
      const mockSpace = { name: "New Space" };
      const savedSpace = { id: "1", ...mockSpace };
      spaceModel.prototype.save.mockResolvedValue(savedSpace);

      const req = { body: mockSpace };
      const rep = { send: jest.fn() };

      await spaceService.addSpace(req, rep);

      expect(spaceModel.prototype.save).toHaveBeenCalled();
      expect(rep.send).toHaveBeenCalledWith(savedSpace);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error adding space");
      spaceModel.prototype.save.mockRejectedValue(mockError);

      const req = { body: { name: "New Space" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.addSpace(req, rep);

      expect(spaceModel.prototype.save).toHaveBeenCalled();
      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("updateSpace", () => {
    it("should update a space", async () => {
      const mockSpace = { id: "1", name: "Updated Space" };
      spaceModel.findByIdAndUpdate.mockResolvedValue(mockSpace);

      const req = { params: { id: "1" }, body: mockSpace };
      const rep = { send: jest.fn() };

      await spaceService.updateSpace(req, rep);

      expect(spaceModel.findByIdAndUpdate).toHaveBeenCalledWith("1", mockSpace, { new: true });
      expect(rep.send).toHaveBeenCalledWith(mockSpace);
    });

    it("should return 404 if space not found", async () => {
      spaceModel.findByIdAndUpdate.mockResolvedValue(null);

      const req = { params: { id: "1" }, body: { name: "Updated Space" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.updateSpace(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("Space not found");
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error updating space");
      spaceModel.findByIdAndUpdate.mockRejectedValue(mockError);

      const req = { params: { id: "1" }, body: { name: "Updated Space" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.updateSpace(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("removeSpace", () => {
    it("should delete a space", async () => {
      spaceModel.findByIdAndDelete.mockResolvedValue(true);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await spaceService.removeSpace(req, rep);

      expect(spaceModel.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(rep.status).toHaveBeenCalledWith(203);
      expect(rep.send).toHaveBeenCalledWith("");
    });

    it("should return 404 if space not found", async () => {
      spaceModel.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await spaceService.removeSpace(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("Space not found");
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error deleting space");
      spaceModel.findByIdAndDelete.mockRejectedValue(mockError);

      const req = { params: { id: "1" } };
      const rep = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await spaceService.removeSpace(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("addAvailability", () => {
    it("should add availability to a space", async () => {
      const mockSpace = { id: "1", availabilities: [] };
      const updatedSpace = { id: "1", availabilities: [{ id: "1", date: "2024-08-17" }] };
      spaceModel.findById.mockResolvedValue(mockSpace);
      mockSpace.save = jest.fn().mockResolvedValue(updatedSpace);

      const req = { params: { id: "1" }, body: { date: "2024-08-17" } };
      const rep = { send: jest.fn() };

      await spaceService.addAvailability(req, rep);

      expect(spaceModel.findById).toHaveBeenCalledWith("1");
      expect(mockSpace.save).toHaveBeenCalled();
      expect(rep.send).toHaveBeenCalledWith(updatedSpace);
    });

    it("should return 404 if space not found", async () => {
      spaceModel.findById.mockResolvedValue(null);

      const req = { params: { id: "1" }, body: { date: "2024-08-17" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.addAvailability(req, rep);

      expect(spaceModel.findById).toHaveBeenCalledWith("1");
      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("Space not found");
    });

    it("should handle errors", async () => {
      const mockError = new Error("Error adding availability");
      spaceModel.findById.mockRejectedValue(mockError);

      const req = { params: { id: "1" }, body: { date: "2024-08-17" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      await spaceService.addAvailability(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(mockError);
    });
  });
});
