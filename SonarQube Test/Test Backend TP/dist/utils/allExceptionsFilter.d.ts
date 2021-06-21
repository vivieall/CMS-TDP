import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    logger: Logger;
    constructor();
    catch(exception: any, host: ArgumentsHost): void;
}
