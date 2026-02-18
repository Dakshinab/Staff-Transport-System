"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const admin_1 = __importDefault(require("./routes/admin"));
const admins_1 = __importDefault(require("./routes/admins"));
const staff_1 = __importDefault(require("./routes/staff"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/drivers', drivers_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/admins', admins_1.default);
app.use('/api/staff', staff_1.default);
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
