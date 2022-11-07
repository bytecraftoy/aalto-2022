'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.app = void 0;
const express_1 = __importDefault(require('express'));
const body_parser_1 = __importDefault(require('body-parser'));
const cors_1 = __importDefault(require('cors'));
const mirror_1 = __importDefault(require('./routers/mirror'));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.text({ type: '*/*' }));
app.use('/mirror', mirror_1.default);
app.use(express_1.default.static('./public/'));
