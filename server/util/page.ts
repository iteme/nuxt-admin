export function getOffset(params: BasePageQuery): number {
  const page = !params.page || params.page < 1 ? 1 : params.page;
  const pageSize = !params.pageSize || params.pageSize < 10 ? 10 : params.pageSize;
  return (page - 1) * pageSize;
}
