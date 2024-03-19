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
const userModel_1 = __importDefault(require("../model/userModel"));
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../api"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.userPayload = {
    Name: "jane",
    Email: "JaneDoe2@gmail.com",
    Password: "Kosi"
};
(0, node_test_1.describe)('Test Users routes', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    node_test_1.describe.only('should home route', () => {
        (0, globals_1.test)('should return url', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(api_1.default).get('/');
            (0, globals_1.expect)(200);
        }));
    });
    (0, node_test_1.describe)('Create User', () => {
        (0, globals_1.test)('shouldl return created', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).post("/user/v1/signup").set('content-type', 'application/json').send({
                Name: "jane",
                Email: "JaneDoe@gmail.com",
                Password: "Kosi"
            });
            (0, globals_1.expect)(response.status).toEqual(201);
            (0, globals_1.expect)(response.body).toMatchObject({
                massage: ' User Created, Check  your Mail and Verify',
                data: globals_1.expect.any(Object)
            });
        }));
    });
    (0, node_test_1.describe)('Verify User Mail', () => {
        let verificationToken;
        const createUser = userModel_1.default.create(exports.userPayload);
        (0, globals_1.test)('should return verified ', () => __awaiter(void 0, void 0, void 0, function* () {
            verificationToken = (yield createUser).verificationToken;
            console.log(verificationToken);
            const response = yield (0, supertest_1.default)(api_1.default).post("/user/v1/verify_email").set("content-type", "application/json").send({ Email: "JaneDoe2@gmail.com", verificationToken });
            (0, globals_1.expect)(response.status).toEqual(200);
            (0, globals_1.expect)(response.body).toMatchObject({ massage: 'User Verified' });
        }));
    });
    (0, node_test_1.describe)('forgot password route', () => {
        const createUser = userModel_1.default.create(exports.userPayload);
        (0, globals_1.test)('should return valid email', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).post("/user/v1/forget_password").set("content-type", "application/json").send({ Email: "JaneDoe2@gmail.com" });
            (0, globals_1.expect)(response.statusCode).toEqual(200);
        }));
    });
    node_test_1.describe.only("Login route", () => {
        const createUser = userModel_1.default.create(exports.userPayload);
        (0, globals_1.test)('should return', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(api_1.default).post("/user/v1/login").set("content-type", "application/json").send({ Email: "JaneDoe1@gmai2.com",
                Password: "Kosi" });
        }));
    });
});
