import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

import { Pool } from "pg";

import { env } from "../config/env.js";

declare global {
    var __prisma__: PrismaClient | undefined;
}

const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma =
    globalThis.__prisma__ ??
    new PrismaClient({
        adapter,
        log: env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["warn", "error"],
    });

if (env.NODE_ENV !== "production") {
    globalThis.__prisma__ = prisma;
}

export default prisma;