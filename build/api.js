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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const userRoute_1 = __importDefault(require("./users/userRoute"));
const urlRoute_1 = require("./urls/urlRoute");
// import viewRouter from './views/viewRouter'
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv.config({ path: __dirname + '/./../../.env' });
const app = (0, express_1.default)();
const port = process.env.PORT;
// Example usage
const corsOptions = {
    origin: 'https://url-shorthener-api.onrender.com',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type:application/json'],
    credentials: true
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'reset.html')));
app.set('views', path_1.default.join(__dirname, './views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, ''));
app.use('/user/v1', userRoute_1.default);
app.use('/url/v1', urlRoute_1.router);
// app.use('/', viewRouter)
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Shortener URL API');
}));
app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        massage: 'Route Not Found',
    });
});
app.use((err, req, res, next) => {
    res.status(500).json({
        data: null,
        error: err.stack,
    });
});
exports.default = app;
