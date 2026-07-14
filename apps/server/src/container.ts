import prisma from "./common/database/prisma.js";

import {
    AuthRepository,
    createAuthController,
    createAuthService
} from "./modules/auth/index.js";

export const repositories = {
    auth: new AuthRepository(prisma),
};

export const services = {
    auth: createAuthService(
        repositories.auth,
    ),
};

export const controllers = {
    auth: createAuthController(
        services.auth,
    ),
};