"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../auth/auth"));
const urlController_1 = __importDefault(require("../urls/urlController"));
exports.router = express_1.default.Router();
exports.router.post('/short_url', auth_1.default.authenticateUser, urlController_1.default.createShortUrl
//     authenticateUser.authenticateUser, async (req: any, res: any) => {
//     const createUrl = await ShortUrl.createShortUrl(req.body,     req.userExist._id
//         )
//     res.status(200).json({createUrl})
// }
);
exports.router.get('/s.com/*', urlController_1.default.redirectShortUrl);
exports.router.get('/history_list', auth_1.default.authenticateUser, urlController_1.default.historyList);
exports.router.get('/analytic', auth_1.default.authenticateUser, urlController_1.default.analytic);
exports.router.get('/analytic/:id', auth_1.default.authenticateUser, urlController_1.default.analyticDetails);
exports.router.patch('/update/:id', auth_1.default.authenticateUser, urlController_1.default.editUrl);
exports.router.delete('/delete', auth_1.default.authenticateUser, urlController_1.default.deleteAll);
exports.router.delete('/deleteOneItem/:id', auth_1.default.authenticateUser, urlController_1.default.deleteOne);
// export  router
