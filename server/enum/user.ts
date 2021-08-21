export enum UserStatusEnum {
  UNKNOWN = 0,
  ACTIVED = 1,
  DISABLED = 2,
  INACTIVE = 4,
  DISMISS = 5,
}

export function isAccessStatus(status: number) {
  return status === UserStatusEnum.ACTIVED;
}
