import express from "express";

import helmet from "helmet";

import cors from "cors";

import compression from "compression";

import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

import { securityConfig } from "./common/config/security.js";

import {
    errorMiddleware,
    notFoundMiddleware,
    requestIdMiddleware
} from "./common/middleware/index.js";

export const createApp = () => {

    const app = express();

    app.disable("x-powered-by");

    app.use(helmet());

    app.use(
        cors(securityConfig.cors)
    );

    app.use(compression());

    app.use(cookieParser());

    app.use(
        express.json({
            limit: "10mb",
        })
    );

    app.use(
        express.urlencoded({
            extended: true,
            limit: "10mb",
        }),
    );

    app.use(requestIdMiddleware);

    app.get(
        "/health",
        (_req, res) => {
            res.status(200).json({
                status: "ok",
                timestamp: new Date().toISOString(),
            });
        },
    );

    app.use("/api/v1", routes);

    app.use(notFoundMiddleware);

    app.use(errorMiddleware);

    return app;
};