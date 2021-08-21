import type { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../type/server';
import { jwtConfig } from '../config';

export function signToken(ctx: Context, user: AuthUser): string {
  const token = jwt.sign(
    {
      userId: user.userId,
      mobile: user.mobile,
      email: user.email,
    },
    jwtConfig.secret
  );
  ctx.cookies.set('token', token, {
    maxAge: jwtConfig.maxAge,
  });
  return token;
}

export function cancelToken(ctx: Context) {
  ctx.cookies.set('token', '', { maxAge: 0 });
}

export function isUnless(ctx: Context): boolean {
  return jwtConfig.allowList.some((exp) => {
    // if (exp === ctx.path) {
    //   return true;
    // }
    if (exp instanceof RegExp) {
      return exp.test(ctx.path);
    }
    return false;
  });
}

export function getAuthUser(ctx: Context): AuthUser {
  const token = ctx.header.token as string;
  if (token) {
    return jwt.verify(token, jwtConfig.secret) as AuthUser;
  } else {
    return { userId: 'anonymous' } as AuthUser;
  }
}
