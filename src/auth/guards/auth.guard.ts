import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): User | undefined => {
  //   if (process.env.NODE_ENV == 'test') {
  //     return currentUserMock as any;
  //   }

  if (context.getType() == 'http') {
    return context.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

export const TokenUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
