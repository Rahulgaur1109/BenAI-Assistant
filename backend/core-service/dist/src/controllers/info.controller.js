import prisma from "../lib/prisma";
export async function getAllInfo(_req, res) {
    const rows = await prisma.universityInfo.findMany({ orderBy: { key: "asc" } });
    res.json({ info: rows });
}
export async function getInfoByKey(req, res) {
    const key = String(req.params.key);
    const row = await prisma.universityInfo.findUnique({ where: { key } });
    if (!row)
        return res.status(404).json({ message: "Not found" });
    res.json(row);
}
