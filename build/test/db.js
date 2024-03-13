"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const node_test_1 = __importStar(require("node:test"));
const api_1 = __importDefault(require("../api"));
const db = __importStar(require("./app.spec"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(api_1.default);
(0, node_test_1.describe)('Test request with mongoose', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.connect();
    }));
    (0, node_test_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db.closeDatabase();
    }));
    (0, node_test_1.default)('GET - /', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/').send();
        const body = res.body;
        const message = body.message;
        expect(res.statusCode);
        expect(message);
    }));
});
function beforeAll(arg0) {
    throw new Error('Function not implemented.');
}
function afterAll(arg0) {
    throw new Error('Function not implemented.');
}
function expect(statusCode) {
    throw new Error('Function not implemented.');
}
function toBe(arg0) {
    throw new Error('Function not implemented.');
}
