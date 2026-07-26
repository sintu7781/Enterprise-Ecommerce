import { Router } from "express";

import { authRouter } from "../modules/auth/auth.module.js";

import { rbacRouter } from "../modules/rbac/rbac.module.js";

const router = Router();

router.use(
    "/auth",
    authRouter,
);

router.use(
    "/rbac",
    rbacRouter,
)

export default router;