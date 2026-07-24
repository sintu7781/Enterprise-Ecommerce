import type { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
  userId: string;

  sessionId: string;

  tokenVersion: number;
}

export interface RefreshTokenPayload extends JwtPayload {
  userId: string;

  sessionId: string;

  tokenId: string;

  tokenVersion: number;
}

export interface TokenPair {
  accessToken: string;

  refreshToken: string;
}

export interface DecodedToken<T extends JwtPayload = JwtPayload,> {
  payload: T;

  issuedAt: Date;

  expiresAt: Date;
}

export type AuthenticatedUser = AccessTokenPayload;