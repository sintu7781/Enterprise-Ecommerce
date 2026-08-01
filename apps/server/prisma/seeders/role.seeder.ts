import type { PrismaExecutor } from "../../src/common/database/prisma.types.js";

import { logger } from "../../src/common/logger/logger.js";

import { ROLES } from "../data/roles.js";

export const seedRoles = async (
    prisma: PrismaExecutor,
) => {

    logger.info("Seeding roles...");

    for (const role of ROLES) {

        await prisma.role.upsert({

            where: {
                name: role.name,
            },

            update: {

                displayName: role.displayName,
                description: role.description,
                isSystem: role.isSystem,
                isActive: true,
                deletedAt: null,

            },

            create: {

                name: role.name,
                displayName: role.displayName,
                description: role.description,
                isSystem: role.isSystem,

            },
        });
    }

    logger.info(`✔ ${ROLES.length} roles seeded.`);

};