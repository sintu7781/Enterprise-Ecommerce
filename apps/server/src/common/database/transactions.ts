import prisma from "./prisma.js";
import type { Prisma } from "@prisma/client";

export type TransactionClient =
    Prisma.TransactionClient;

export interface DatabaseTransactionOptions {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: Prisma.TransactionIsolationLevel;
};

export const withTransaction = async <T>(
    callback: (
        tx: TransactionClient,
    ) => Promise<T>,
    options?: DatabaseTransactionOptions,
): Promise<T> => {
    return prisma.$transaction(
        callback,
        options,
    );
};