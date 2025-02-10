const chai = require("chai");
const sinon = require("sinon");
const app = require("../src/app"); // Assuming you have an Express app in app.js
const {
  editProfile,
  viewProfile,
  updatePassword,
} = require("../src/controllers/profile");
const {
  validateProfileEditData,
  comparePass,
  validatePassword,
  generateResponse,
} = require("../src/utils/helper");
const encryptString = require("../src/utils/encryptStrings");

const { expect } = chai;

describe("Profile Controller", () => {
  let req, res, user;

  beforeEach(() => {
    user = {
      save: sinon.stub().resolves(),
      password: "hashedPassword",
    };
    req = {
      user,
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  describe("editProfile", () => {
    it("should return 400 if validation fails", async () => {
      sinon.stub(validateProfileEditData, "returns").returns(false);
      await editProfile(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Error: Invalid Edit Request" })).to
        .be.true;
      validateProfileEditData.returns.restore();
    });

    it("should update user profile and return 200", async () => {
      sinon.stub(validateProfileEditData, "returns").returns(true);
      req.body = { name: "newName" };
      await editProfile(req, res);
      expect(user.name).to.equal("newName");
      expect(user.save.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      validateProfileEditData.returns.restore();
    });
  });

  describe("viewProfile", () => {
    it("should return user details with status 200", async () => {
      await viewProfile(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({ message: "User details fetched", data: user })
      ).to.be.true;
    });
  });

  describe("updatePassword", () => {
    it("should return 400 if old password is incorrect", async () => {
      sinon.stub(comparePass, "returns").returns(false);
      req.body = { oldPassword: "wrongPassword", newPassword: "newPassword" };
      await updatePassword(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Error: Invalid old password" })).to
        .be.true;
      comparePass.returns.restore();
    });

    it("should update password and return 200", async () => {
      sinon.stub(comparePass, "returns").returns(true);
      sinon.stub(validatePassword, "returns").returns(true);
      sinon.stub(encryptString, "returns").resolves("newHashedPassword");
      req.body = { oldPassword: "correctPassword", newPassword: "newPassword" };
      await updatePassword(req, res);
      expect(user.password).to.equal("newHashedPassword");
      expect(user.save.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      comparePass.returns.restore();
      validatePassword.returns.restore();
      encryptString.returns.restore();
    });
  });
});
