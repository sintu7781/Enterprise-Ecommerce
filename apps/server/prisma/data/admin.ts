import { env } from "../../src/common/config/env.js";

export const ADMIN_USER = {

    email: env.SEED_ADMIN_EMAIL ??
        "admin@example.com",

    username: env.SEED_ADMIN_USERNAME ??
        "superadmin",

    password: env.SEED_ADMIN_PASSWORD ??
        "Admin@12345",

    firstName: env.SEED_ADMIN_FIRST_NAME ??
        "Super",

    lastName: env.SEED_ADMIN_LAST_NAME ??
        "Admin",

} as const;