import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ReqTokens = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.tokens || {};
  },
);
