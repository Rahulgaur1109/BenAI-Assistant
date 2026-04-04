"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listEvents = listEvents;
exports.createEvent = createEvent;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function listEvents(_req, res) {
    const events = await prisma_1.default.event.findMany({ orderBy: { startTime: "asc" } });
    res.json({ events });
}
const createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    link: zod_1.z.string().url().optional()
});
async function createEvent(req, res) {
    try {
        const data = createEventSchema.parse(req.body);
        const created = await prisma_1.default.event.create({
            data: {
                title: data.title,
                description: data.description || null,
                startTime: new Date(data.startTime),
                endTime: data.endTime ? new Date(data.endTime) : null,
                location: data.location || null,
                link: data.link || null
            }
        });
        res.status(201).json(created);
    }
    catch (err) {
        if (err.name === "ZodError")
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        // eslint-disable-next-line no-console
        console.error("createEvent error", err);
        res.status(500).json({ message: "Failed to create event" });
    }
}
