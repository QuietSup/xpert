import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (
      // console.log(err);
      exception.hasOwnProperty('code') &&
      exception.hasOwnProperty('message')
    ) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      // const request = ctx.getRequest<Request>();
      response.status(exception.code);
      response.json({
        statusCode: exception.code,
        message: exception.message,
      });
    }
    response.json();
  }
}
