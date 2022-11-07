'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const router = express_1.default.Router();
router.post('/', (req, res) => {
    res.send(req.body);
});
router.get('/*', (req, res) => {
    res.send(req.path);
});
exports.default = router;
