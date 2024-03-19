"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPayload = void 0;
const node_test_1 = require("node:test");
const globals_1 = require("@jest/globals");
const mongodb_memory_server_1 = require("mongodb-memory-server");
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../api"));
const userServices_1 = __importDefault(require("../users/userServices"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.userPayload = {
    Name: "jane",
    Email: "JaneDoe2@gmail.com",
    Password: "Kosi"
};
(0, node_test_1.describe)("URL Route", () => {
    let verificationToken;
    let token;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const createUser = userServices_1.default.createUser(exports.userPayload);
        const validateMail = userServices_1.default.verifyMail(exports.userPayload.Email);
        verificationToken = (_a = (yield createUser).data) === null || _a === void 0 ? void 0 : _a.token;
        const jwtT = yield userServices_1.default.login(exports.userPayload.Email, exports.userPayload.Password);
        // const response = await supertest(app).post("/user/v1/login").set("content-type", "application/json").send({
        //     Email: "JaneDoe2@gmail.com",
        //     Password: "Kosi"
        // })
        token = (_b = jwtT.data) === null || _b === void 0 ? void 0 : _b.token;
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    (0, globals_1.test)("Create Short Url", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(api_1.default).post("/url/v1/short_url").set("authorization", `Bearer ${token}`).set("content-type", "application/json").send({ Long_url: "www.unn.edu.ng", Custtom_url: "" });
        (0, globals_1.expect)(response.statusCode).toEqual(201);
    }), 100000);
});
