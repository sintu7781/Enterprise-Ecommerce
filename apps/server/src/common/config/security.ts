import { env } from "./env.js";

export const securityConfig = Object.freeze({

    cors: {
        origin: env.CORS_ORIGIN.split(","),
        credentials: true,
    },

    jwt: Object.freeze({
        accessSecret: env.JWT_ACCESS_SECRET,
        refreshSecret: env.JWT_REFRESH_SECRET,

        accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
        refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,

        issuer: env.JWT_ISSUER,
        audience: env.JWT_AUDIENCE,
        algorithm: env.JWT_ALGORITHM,
    }),

    bcrypt: Object.freeze({
        saltRounds: env.BCRYPT_SALT_ROUNDS,
    }),

    token: Object.freeze({
        passwordResetBytes:
            env.PASSWORD_RESET_TOKEN_BYTES,

        emailVerificationBytes:
            env.EMAIL_VERIFICATION_TOKEN_BYTES,

        sessionIdBytes:
            env.SESSION_ID_BYTES,

        refreshTokenIdBytes:
            env.REFRESH_TOKEN_ID_BYTES,
    }),

    cookie: Object.freeze({
        refreshToken: Object.freeze({
            name: "refreshToken",
            httpOnly: true,
            secure: env.COOKIE_SECURE,
            sameSite: env.COOKIE_SAME_SITE,
            domain: env.COOKIE_DOMAIN,
            path: "/api/v1/auth/refresh",
            maxAge: env.REFRESH_COOKIE_MAX_AGE,
        }),
    }),

    auth: Object.freeze({
        maxLoginAttempts: 5,
        lockoutMinutes: 15,
    }),
});