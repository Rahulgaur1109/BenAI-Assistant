"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "ai-service" });
});
app.use("/chat", chat_routes_1.default);
const PORT = Number(process.env.PORT || 3010);
const server = app.listen(PORT, "0.0.0.0", () => {
    // eslint-disable-next-line no-console
    console.log(`ai-service running on port ${PORT}`);
});
server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
// Keep the process alive
setInterval(() => {
    console.log("ai-service heartbeat");
}, 30000);
