import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error = exception.getError();

    if (error.hasOwnProperty('code') && error.hasOwnProperty('message')) {
      return throwError(error);
    }

    return throwError({
      code: 500,
      message: 'Unknown server error',
      details: error,
    });
  }
}
