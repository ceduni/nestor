const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { addUser, loginUser, updateUser, getUser, authenticateToken } = require("../services/user.service");

// Mock dependencies
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");

describe("User Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addUser", () => {
    it("should create a new user when user does not exist", async () => {
      const req = {
        body: {
          userName: "testuser",
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com",
          password: "password123",
          role: "student",
        },
      };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findOne.mockResolvedValue(null); // No user exists
      bcrypt.hashSync.mockReturnValue("hashedPassword123");
      User.prototype.save.mockResolvedValue(req.body); // Mock the save method

      await addUser(req, rep);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 10);
      expect(rep.send).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });

    it("should return 400 if user already exists", async () => {
      const req = {
        body: { email: "testuser@example.com" },
      };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findOne.mockResolvedValue(true); // User exists

      await addUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(400);
      expect(rep.send).toHaveBeenCalledWith({ message: "User already exists" });
    });

    it("should return 500 on error", async () => {
      const req = { body: {} };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findOne.mockRejectedValue(new Error("DB Error"));

      await addUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("loginUser", () => {
    it("should log in a user with valid credentials", async () => {
      const req = {
        body: {
          email: "testuser@example.com",
          password: "password123",
        },
      };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      const mockUser = {
        _id: "userId123",
        userName: "testuser",
        password: "hashedPassword123",
        role: "student",
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue("mockToken");

      await loginUser(req, rep);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id, role: mockUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(rep.send).toHaveBeenCalledWith({
        token: "mockToken",
        user: {
          id: mockUser._id,
          userName: mockUser.userName,
          role: mockUser.role,
        },
      });
    });

    it("should return 401 if email or password is invalid", async () => {
      const req = { body: { email: "wrongemail@example.com", password: "wrongpassword" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findOne.mockResolvedValue(null); // User not found

      await loginUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(401);
      expect(rep.send).toHaveBeenCalledWith({ error: "Invalid email or password" });
    });

    it("should return 500 on error", async () => {
      const req = { body: {} };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findOne.mockRejectedValue(new Error("DB Error"));

      await loginUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      const req = {
        params: { id: "userId123" },
        body: { password: "newpassword123" },
      };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      bcrypt.hashSync.mockReturnValue("hashedNewPassword123");
      User.findByIdAndUpdate.mockResolvedValue({ _id: "userId123", password: "hashedNewPassword123" });

      await updateUser(req, rep);

      expect(bcrypt.hashSync).toHaveBeenCalledWith("newpassword123", 10);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, expect.any(Object), { new: true });
      expect(rep.send).toHaveBeenCalledWith({ _id: "userId123", password: "hashedNewPassword123" });
    });

    it("should return 404 if user is not found", async () => {
      const req = { params: { id: "invalidId" }, body: {} };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findByIdAndUpdate.mockResolvedValue(null); // User not found

      await updateUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("User not found");
    });

    it("should return 500 on error", async () => {
      const req = { params: { id: "userId123" }, body: {} };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findByIdAndUpdate.mockRejectedValue(new Error("DB Error"));

      await updateUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("getUser", () => {
    it("should retrieve a user by ID", async () => {
      const req = { params: { id: "userId123" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      const mockUser = { _id: "userId123", userName: "testuser" };
      User.findById.mockResolvedValue(mockUser);

      await getUser(req, rep);

      expect(User.findById).toHaveBeenCalledWith(req.params.id);
      expect(rep.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 if user is not found", async () => {
      const req = { params: { id: "invalidId" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findById.mockResolvedValue(null); // User not found

      await getUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(404);
      expect(rep.send).toHaveBeenCalledWith("User not found");
    });

    it("should return 500 on error", async () => {
      const req = { params: { id: "userId123" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };

      User.findById.mockRejectedValue(new Error("DB Error"));

      await getUser(req, rep);

      expect(rep.status).toHaveBeenCalledWith(500);
      expect(rep.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("authenticateToken", () => {
    it("should authenticate a valid token", async () => {
      const req = {
        headers: {
          authorization: "Bearer validToken",
        },
      };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };
      const next = jest.fn();

      jwt.verify.mockReturnValue({ userId: "userId123", role: "student" });

      await authenticateToken(req, rep, next);

      expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.JWT_SECRET);
      expect(req.user).toEqual({ userId: "userId123", role: "student" });
      expect(next).toHaveBeenCalled();
    });

    it("should return 401 if no token is provided", async () => {
      const req = { headers: {} };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };
      const next = jest.fn();

      await authenticateToken(req, rep, next);

      expect(rep.status).toHaveBeenCalledWith(401);
      expect(rep.send).toHaveBeenCalledWith({ message: "Token required" });
    });

    it("should return 403 if token is invalid", async () => {
      const req = { headers: { authorization: "Bearer invalidToken" } };
      const rep = { send: jest.fn(), status: jest.fn().mockReturnThis() };
      const next = jest.fn();

      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await authenticateToken(req, rep, next);

      expect(rep.status).toHaveBeenCalledWith(403);
      expect(rep.send).toHaveBeenCalledWith({ message: "Forbidden" });
    });
  });
});
