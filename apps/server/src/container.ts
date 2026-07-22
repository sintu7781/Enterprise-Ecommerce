import prisma from "./common/database/prisma.js";

import {
    AuthRepository,
    createAuthController,
    createAuthService
} from "./modules/auth/index.js";
import { SmtpAdapter } from "./modules/email/adapters/smtp.adapter.js";
import { createEmailService } from "./modules/email/services/email.service.js";
import {
    RbacRepository,
    createRbacService,
    createRbacController,
 } from "./modules/rbac/index.js";

const emailService = createEmailService(
    new SmtpAdapter()
);

export const repositories = {
    auth: new AuthRepository(prisma),

    rbac: new RbacRepository(prisma),
};

export const services = {

    email: emailService,

    auth: createAuthService({
        repository: repositories.auth,
        emailService: emailService,
    }),

    rbac: createRbacService({
        repository: repositories.rbac,
    }),
};

export const controllers = {
    auth: createAuthController(
        services.auth,
    ),

    rbac: createRbacController(
        services.rbac,
    ),
};