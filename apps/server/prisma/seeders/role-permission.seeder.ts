import type { PrismaExecutor } from "../../src/common/database/prisma.types.js";

import { ROLE_PERMISSIONS } from "../data/role-permissions.js";

import { logger } from "../../src/common/logger/logger.js";

import { SeedError } from "../../src/common/errors/SeedError.js";

export const seedRolePermissions = async (
    prisma: PrismaExecutor,
) => {

    logger.info("Seeding role permissions...");

    const permissions = await prisma.permission.findMany();

    const permissionMap = new Map(
        permissions.map((permission) => [
            permission.code,
            permission.id,
        ]),
    );

    const roles = await prisma.role.findMany();

    const roleMap = new Map(
        roles.map((role) => [
            role.name,
            role.id,
        ]),
    );

    for (const [roleName, codes] of Object.entries(ROLE_PERMISSIONS)) {

        const roleId = roleMap.get(roleName);

        if (!roleId) {

            throw new SeedError(
                `Role '${roleName}' not found.`,
            );

        }

        const permissionIds = codes.includes("*")
            ? permissions.map((permission) => permission.id)
            : codes.map((code) => {

                const permissionId = permissionMap.get(code);

                if (!permissionId) {

                    throw new Error(
                        `Permission '${code}' not found.`,
                    );

                }

                return permissionId;

            });

        for (const permissionId of permissionIds) {

            await prisma.rolePermission.upsert({

                where: {

                    roleId_permissionId: {

                        roleId,
                        permissionId,

                    },

                },

                update: {},

                create: {

                    roleId,
                    permissionId,

                },
            });

        }

    }

    logger.info(
        `✔ ${permissions.length} permissions assigned to roles.`,
    );

};