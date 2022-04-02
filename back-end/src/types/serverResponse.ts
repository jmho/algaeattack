type ErrorCode = number;

interface SuccessResponseBody {
    success: true,
    data?: { [key: string]: any; } | Array<any> | null,
}

interface FailureResponseBody {
    success: false,
    data?: { [key: string]: any; } | Array<any> | null,
    error: Array<ErrorCode>;
}