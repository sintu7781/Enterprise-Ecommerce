import { randomBytes, randomUUID } from "node:crypto";

import { securityConfig } from "../config/security.js";

class TokenService {

    public readonly generateSessionId = (): string => {
        return randomUUID();
    };

    public readonly generateTokenId = (): string => {
        return randomUUID();
    }
    
    private readonly generateRandomToken = (
        bytes: number,
    ): string => {
        return randomBytes(bytes).toString("hex");
    };

    public readonly generateEmailVerificationToken =
        (): string => {
            return this.generateRandomToken(
                securityConfig.token.emailVerificationBytes,
            );
        };
    
    public readonly getEmailVerificationTokenExpiry =
        (): Date => {
            return new Date(
                Date.now() +
                1000 * 60 * 60 * 24,
            );
        };

    public readonly generatePasswordResetToken =
        (): string => {
            return this.generateRandomToken(
                securityConfig.token.passwordResetBytes,
            );
        };
    
    public readonly getRefreshTokenExpiry =
        (): Date => {
            return new Date(
                Date.now() +
                securityConfig.cookie.refreshToken.maxAge,
            );
        };
    
    public readonly getPasswordResetTokenExpiry =
        (): Date => {
            return new Date(
                Date.now() +
                1000 * 60 * 15,
            );
        };
}

export const tokenService = Object.freeze(
    new TokenService(),
);