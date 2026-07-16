import type { PrismaClient } from "@prisma/client";

import type {
  PaginationMeta,
  PaginatedResult,
} from "../interfaces/pagination.interface.js";

import { TransactionClient } from "./transactions.js";

import { withTransaction } from "./transactions.js";

export abstract class BaseRepository {
  protected readonly prisma: PrismaClient;

  protected constructor(
    prisma: PrismaClient,
  ) {
    this.prisma = prisma;
  }

  protected readonly exists = async (
    query: () => Promise<number>,
  ): Promise<boolean> => {
    return (await query()) > 0;
  };

  protected readonly paginate = async <T>(
    dataQuery: () => Promise<T[]>,
    countQuery: () => Promise<number>,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<T>> => {
    const [data, total] = await Promise.all([
      dataQuery(),
      countQuery(),
    ]);

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    };

    return {
      data,
      meta,
    };
  };

  protected readonly executeTransaction = async <T>(
    callback: (
      tx: TransactionClient,
    ) => Promise<T>,
  ): Promise<T> => {
    return withTransaction(callback);
  };
}