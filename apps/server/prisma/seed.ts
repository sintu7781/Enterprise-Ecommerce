import prisma from "../src/common/database/prisma.js";

import { seedPermissions } from "./seeders/permission.seeder.js";

import { seedRoles } from "./seeders/role.seeder.js";

import { seedRolePermissions } from "./seeders/role-permission.seeder.js";

import { seedAdminUser } from "./seeders/admin-user.seeder.js";

import { seedUserRoles } from "./seeders/user-role.seeder.js";

import { logger } from "../src/common/logger/logger.js";

import { withTransaction } from "../src/common/database/transactions.js";

const main = async () => {

    logger.info("\n🌱 Starting database seed...\n");

    await withTransaction(
        async (tx) => {

        await seedPermissions(tx);

        await seedRoles(tx);

        await seedRolePermissions(tx);

        await seedAdminUser(tx);

        await seedUserRoles(tx);
    });
    
    logger.info("\n✅ Database seed completed.\n");
}

main()
    .catch((error) => {
        logger.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });