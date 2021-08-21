import { Files } from 'formidable';
import type Koa from 'koa';
import type { AuthUser } from './server';

declare module 'koa' {
  interface Context {
    authUser: AuthUser;
    success(result?: any, msg?: string): void;
    fail(msg?: string, code?: number): void;
  }

  interface Request extends Koa.BaseRequest {
    files?: Files;
  }
}
