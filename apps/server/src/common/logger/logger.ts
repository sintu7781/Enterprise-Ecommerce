import pino, { type LoggerOptions } from "pino";

import { env } from "../config/env.js";

const createLoggerOptions = (): LoggerOptions => {

    const options: LoggerOptions = {
        level: env.LOG_LEVEL,

        base: {
            service: env.APP_NAME,
        },
    };

    if (env.NODE_ENV === "development") {
        options.transport = {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
            },
        };
    }

    return options;
};

export const logger = pino(
    createLoggerOptions(),
);