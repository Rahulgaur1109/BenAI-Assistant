"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const teachers_routes_1 = __importDefault(require("./routes/teachers.routes"));
const info_routes_1 = __importDefault(require("./routes/info.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "core-service" });
});
app.use("/api/teachers", teachers_routes_1.default);
app.use("/api/university", info_routes_1.default);
app.use("/api/events", events_routes_1.default);
const PORT = Number(process.env.PORT || 3020);
const server = app.listen(PORT, "0.0.0.0", () => {
    // eslint-disable-next-line no-console
    console.log(`core-service running on port ${PORT}`);
});
server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection:", err);
});
// Keep process alive
setInterval(() => {
    // eslint-disable-next-line no-console
    console.log("Server heartbeat");
}, 30000);
