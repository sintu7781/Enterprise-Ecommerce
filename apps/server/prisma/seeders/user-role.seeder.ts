import type { PrismaExecutor } from "../../src/common/database/prisma.types.js";

import { ADMIN_USER } from "../data/admin.js";

import { logger } from "../../src/common/logger/logger.js";

import { SeedError } from "../../src/common/errors/SeedError.js";

export const seedUserRoles = async (
    prisma: PrismaExecutor,
) => {

    logger.info("Assigning SUPER_ADMIN role...");

    const user = await prisma.user.findUnique({

        where: {
            email: ADMIN_USER.email,
        },

    });

    if (!user) {

        throw new SeedError(
            "Seed admin user not found.",
        );

    }

    const role = await prisma.role.findUnique({

        where: {
            name: "SUPER_ADMIN",
        },

    });

    if (!role) {

        throw new SeedError(
            "SUPER_ADMIN role not found.",
        );

    }

    await prisma.userRole.upsert({

        where: {

            userId_roleId: {

                userId: user.id,

                roleId: role.id,

            },

        },

        update: {

            assignedByUserId: user.id,

        },

        create: {

            userId: user.id,

            roleId: role.id,

            assignedByUserId: user.id,
        },

    });

    logger.info("✔ SUPER_ADMIN assigned.");

}