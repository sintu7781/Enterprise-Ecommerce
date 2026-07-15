import http from "node:http";

import prisma from "./common/database/prisma.js";

import { env } from "./common/config/env.js";

import { logger } from "./common/logger/index.js";

import { createApp } from "./app.js";

const app = createApp();

const server = http.createServer(app);

server.listen(env.PORT, () => {
    logger.info(
        `🚀 Server running on http://${env.HOST}:${env.PORT}`,
    );
});

server.keepAliveTimeout = 65_000;
server.headersTimeout = 66_000;

const shutdown = async (
    signal: string,
): Promise<void> => {

    logger.info(
        `${signal} received. Shutting down...`,
    );

    server.close(async () => {
        
        await prisma.$disconnect();

        logger.info("Database disconnected.");

        process.exit(0);
    });
};

process.on(
    "SIGINT",
    () => shutdown("SIGINT"),
);

process.on(
    "SIGTERM",
    () => shutdown("SIGTERM"),
);

process.on(
    "uncaughtException",
    async (error) => {
        
        logger.fatal(
            error,
            "Uncaught exception",
        );

        await prisma.$disconnect();

        process.exit(1);
    },
);

process.on(
    "unhandledRejection",
    async (reason) => {
        
        logger.fatal(
            { reason },
            "Unhandled promise rejection"
        );

        await prisma.$disconnect();

        process.exit(1);
    },
);