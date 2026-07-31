import jwt from "jsonwebtoken";
import type {
  Algorithm,
  JwtPayload,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";

import { securityConfig } from "../config/security.js";

import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "./types.js";

const jwtOptions = {
  issuer: securityConfig.jwt.issuer,
  audience: securityConfig.jwt.audience,
  algorithm: securityConfig.jwt.algorithm as Algorithm,
} as const;

class JwtService {
  public readonly generateAccessToken = (
    payload: AccessTokenPayload,
  ): string => {
    const options: SignOptions = {
      ...jwtOptions,
      expiresIn: securityConfig.jwt.accessExpiresIn,
    };

    return jwt.sign(
      payload,
      securityConfig.jwt.accessSecret,
      options,
    );
  };

  public readonly generateRefreshToken = (
    payload: RefreshTokenPayload,
  ): string => {
    const options: SignOptions = {
      ...jwtOptions,
      expiresIn: securityConfig.jwt.refreshExpiresIn,
    };

    return jwt.sign(
      payload,
      securityConfig.jwt.refreshSecret,
      options,
    );
  };

  public readonly verifyAccessToken = (
    token: string,
  ): AccessTokenPayload => {
    const options: VerifyOptions = {
      issuer: securityConfig.jwt.issuer,
      audience: securityConfig.jwt.audience,
      algorithms: [securityConfig.jwt.algorithm as Algorithm],
    };

    return jwt.verify(
      token,
      securityConfig.jwt.accessSecret,
      options,
    ) as AccessTokenPayload;
  };

  public readonly verifyRefreshToken = (
    token: string,
  ): RefreshTokenPayload => {
    const options: VerifyOptions = {
      issuer: securityConfig.jwt.issuer,
      audience: securityConfig.jwt.audience,
      algorithms: [securityConfig.jwt.algorithm as Algorithm],
    };

    return jwt.verify(
      token,
      securityConfig.jwt.refreshSecret,
      options,
    ) as RefreshTokenPayload;
  };

  public readonly decodeToken = (
    token: string,
  ): JwtPayload | null => {
    const decoded = jwt.decode(token);

    if (decoded === null || typeof decoded === "string") {
      return null;
    }

    return decoded;
  };
}

export const jwtService = Object.freeze(new JwtService());