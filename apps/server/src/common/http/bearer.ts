import { AuthenticationError } from "../errors/AuthenticationError.js";

export const extractBearerToken = (
    authorization?: string,
): string => {

    if (!authorization) {
        throw new AuthenticationError(
            "Authentication required.",
        );
    }

    const [
        scheme,
        token,
    ] = authorization.split(" ");

    if (
        scheme !== "Bearer" ||
        !token
    ) {
        throw new AuthenticationError(
            "Invalid authorization header.",
        );
    }

    return token;
};