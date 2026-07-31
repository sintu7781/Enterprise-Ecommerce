import bcrypt from "bcrypt";

import { securityConfig } from "../config/security.js";

class PasswordService {
  public readonly hash = async (
    plainPassword: string,
  ): Promise<string> => {
    return bcrypt.hash(
      plainPassword,
      securityConfig.bcrypt.saltRounds,
    );
  };

  public readonly compare = async (
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    return bcrypt.compare(
      plainPassword,
      hashedPassword,
    );
    };
    
  public readonly needsRehash = (
    hashedPassword: string,
  ): boolean => {
    return (
      bcrypt.getRounds(hashedPassword) <
      securityConfig.bcrypt.saltRounds
    );
  };
}

export const passwordService = Object.freeze(
  new PasswordService(),
);