import { StatusCodes } from "http-status-codes";

export interface ApiResponseOptions<T> {
    statusCode?: number;
    message: string;
    data?: T;
    meta?: unknown;
}

export class ApiResponse<T = unknown> {

    public constructor(
        options: ApiResponseOptions<T>,
    ) {
        this.statusCode =
            options.statusCode ??
            StatusCodes.OK;
        
        this.message = options.message;

        this.data =
            options.data ?? null;
        
        this.meta =
            options.meta ?? null;
        
        this.timestamp =
            new Date().toISOString();

    }
    
    public readonly success = true;

    public readonly statusCode: number;

    public readonly message: string;

    public readonly data: T | null;

    public readonly meta: unknown;

    public readonly timestamp: string;

}