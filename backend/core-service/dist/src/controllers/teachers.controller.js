import { z } from "zod";
import prisma from "../lib/prisma";
export async function listTeachers(_req, res) {
    const teachers = await prisma.teacher.findMany({
        include: { user: { select: { id: true, name: true, email: true, image: true } } },
        orderBy: { id: "asc" }
    });
    res.json({ teachers });
}
export async function getTeacherById(req, res) {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ message: "Invalid id" });
    const teacher = await prisma.teacher.findUnique({
        where: { id },
        include: { user: { select: { id: true, name: true, email: true, image: true } } }
    });
    if (!teacher)
        return res.status(404).json({ message: "Not found" });
    res.json(teacher);
}
const createTeacherSchema = z.object({
    userEmail: z.string().email(),
    department: z.string(),
    designation: z.string().optional(),
    employeeId: z.string().optional(),
    specialization: z.string().optional(),
    cabin: z.string().optional(),
    phone: z.string().optional()
});
export async function createTeacher(req, res) {
    try {
        const data = createTeacherSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email: data.userEmail } });
        if (!user)
            return res.status(404).json({ message: "User not found for given email" });
        const created = await prisma.teacher.create({
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
