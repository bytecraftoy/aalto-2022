'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.server = void 0;
const http_1 = __importDefault(require('http'));
const app_1 = require('./app');
const PORT = process.env.PORT || 3030;
const server = http_1.default.createServer(app_1.app);
exports.server = server;
if (process.env.NODE_ENV !== 'test')
    server.listen(PORT, () =>
        console.log(`server running on http://localhost:${PORT}`)
    );
