"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTeachers = listTeachers;
exports.getTeacherById = getTeacherById;
exports.createTeacher = createTeacher;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function listTeachers(_req, res) {
    const teachers = await prisma_1.default.teacher.findMany({
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
        orderBy: { id: "asc" }
    });
    res.json({ teachers });
}
async function getTeacherById(req, res) {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
    const teacher = await prisma_1.default.teacher.findUnique({
        where: { id },
        include: { user: { select: { id: true, name: true, email: true, image: true } } }
    });
    if (!teacher)
        return res.status(404).json({ message: "Not found" });
    res.json(teacher);
}
const createTeacherSchema = zod_1.z.object({
    userEmail: zod_1.z.string().email(),
    department: zod_1.z.string(),
    designation: zod_1.z.string().optional(),
    employeeId: zod_1.z.string().optional(),
    specialization: zod_1.z.string().optional(),
    cabin: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional()
});
async function createTeacher(req, res) {
    try {
        const data = createTeacherSchema.parse(req.body);
        const user = await prisma_1.default.user.findUnique({ where: { email: data.userEmail } });
        if (!user)
            return res.status(404).json({ message: "User not found for given email" });
        const created = await prisma_1.default.teacher.create({
            data: {
                userId: user.id,
                department: data.department,
                designation: data.designation || null,
                employeeId: data.employeeId || null,
                specialization: data.specialization || null,
                cabin: data.cabin || null,
                phone: data.phone || null
            },
            include: { user: { select: { id: true, name: true, email: true, image: true } } }
        });
        res.status(201).json(created);
    }
    catch (err) {
        if (err.name === "ZodError")
            return res.status(400).json({ message: "Validation failed", errors: err.errors });
        // eslint-disable-next-line no-console
        console.error("createTeacher error", err);
        res.status(500).json({ message: "Failed to create teacher" });
    }
}
