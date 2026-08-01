import type { PrismaExecutor } from "../../src/common/database/prisma.types.js";

import { ADMIN_USER } from "../data/admin.js";

import { passwordService } from "../../src/common/security/password.service.js";

import { logger } from "../../src/common/logger/logger.js";
import { UserStatus } from "@prisma/client";

export const seedAdminUser = async (
    prisma: PrismaExecutor,
) => {

    logger.info("Seeding admin user...");

    const hashedPassword = await passwordService.hash(
        ADMIN_USER.password,
    );

    await prisma.user.upsert({

        where: {
            email: ADMIN_USER.email,
        },

        update: {

            username: ADMIN_USER.username,

            firstName: ADMIN_USER.firstName,

            lastName: ADMIN_USER.lastName,

            password: hashedPassword,

            status: UserStatus.ACTIVE,

            emailVerifiedAt: new Date(),

            deletedAt: null,
        },

        create: {

            email: ADMIN_USER.email,

            username: ADMIN_USER.username,

            password: hashedPassword,

            firstName: ADMIN_USER.firstName,

            lastName: ADMIN_USER.lastName,

            status: UserStatus.ACTIVE,

            emailVerifiedAt: new Date(),
        },

    });

    logger.info("✔ Admin user seeded.");
};