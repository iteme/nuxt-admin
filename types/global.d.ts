declare interface BasePageQuery {
  page: number;
  pageSize: number;
  total?: number;
}

declare interface BaseResult<T extends any> {
  success?: boolean;
  code: number;
  msg: string;
  result: T;
}
