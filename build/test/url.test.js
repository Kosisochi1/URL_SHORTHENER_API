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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const node_test_1 = require("node:test");
const api_1 = __importDefault(require("../api"));
(0, node_test_1.describe)('url', () => {
    (0, node_test_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
        const MongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(MongoServer.getUri());
    }));
    (0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    (0, node_test_1.describe)('user not logged in', () => {
        (0, node_test_1.it)('should return 401', () => __awaiter(void 0, void 0, void 0, function* () {
            const { statusCode } = yield (0, supertest_1.default)(api_1.default).post('/url/v1/short_url');
            expect(statusCode);
        }));
    });
});
function expect(statusCode) {
    throw new Error('Function not implemented.');
}
