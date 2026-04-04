"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInfo = getAllInfo;
exports.getInfoByKey = getInfoByKey;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function getAllInfo(_req, res) {
    const rows = await prisma_1.default.universityInfo.findMany({ orderBy: { key: "asc" } });
    res.json({ info: rows });
}
async function getInfoByKey(req, res) {
    const key = String(req.params.key);
    const row = await prisma_1.default.universityInfo.findUnique({ where: { key } });
    if (!row)
        return res.status(404).json({ message: "Not found" });
    res.json(row);
}
