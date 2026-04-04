"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = chat;
const zod_1 = require("zod");
const gemini_1 = require("../services/gemini");
const chatSchema = zod_1.z.object({
    message: zod_1.z.string().min(1),
    userId: zod_1.z.string().optional(),
    role: zod_1.z.string().optional()
});
async function chat(req, res) {
    try {
        const { message, userId, role } = chatSchema.parse(req.body);
        const answer = await (0, gemini_1.generateAnswer)({ message, userId, role });
        return res.json({ reply: answer });
    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        }
        // eslint-disable-next-line no-console
        console.error("AI chat error:", err);
        console.error("Error stack:", err.stack);
        return res.status(500).json({ message: "Failed to generate response", error: err.message });
    }
}
