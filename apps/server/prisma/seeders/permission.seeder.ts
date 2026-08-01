import type { PrismaExecutor } from "../../src/common/database/prisma.types.js";

import { PERMISSIONS } from "../data/permissions.js";

import { logger } from "../../src/common/logger/logger.js";

export const seedPermissions = async (
    prisma: PrismaExecutor,
) => {

    logger.info("Seeding permissions...");

    for (const permission of PERMISSIONS) {

        await prisma.permission.upsert({

            where: {

                code: permission.code,

            },

            update: {

                displayName: permission.displayName,
                description: permission.description,
                isSystem: permission.isSystem,
                isActive: true,
                deletedAt: null,

            },

            create: {

                code: permission.code,
                displayName: permission.displayName,
                description: permission.description,
                isSystem: permission.isSystem,
            },

        });

    }

    logger.info(`✔ ${PERMISSIONS.length} permissions seeded.`);

}