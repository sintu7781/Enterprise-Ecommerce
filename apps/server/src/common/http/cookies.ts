import type { Response } from "express";

import { securityConfig } from "../config/security.js";

const refreshCookie = securityConfig.cookie.refreshToken;

export const setRefreshTokenCookie = (
    res: Response,
    token: string,
): void => {

    res.cookie(
        refreshCookie.name,
        token,
        {
            httpOnly: refreshCookie.httpOnly,
            secure: refreshCookie.secure,
            sameSite: refreshCookie.sameSite,
            path: refreshCookie.path,
            domain: refreshCookie.domain,
            maxAge: refreshCookie.maxAge,
        },
    );
};

export const clearRefreshTokenCookie = (
    res: Response,
): void => {

    res.clearCookie(
        refreshCookie.name,
        {
            httpOnly: refreshCookie.httpOnly,
            secure: refreshCookie.secure,
            sameSite: refreshCookie.sameSite,
            path: refreshCookie.path,
            domain: refreshCookie.domain,
        },
    );
};