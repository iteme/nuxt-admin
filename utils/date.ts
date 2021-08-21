import moment from 'moment';

export function toNormalDateTime(value: number) {
  return Number.isInteger(value) ? moment(value * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
}

export function toNormalDate(value: number) {
  return Number.isInteger(value) ? moment(value * 1000).format('YYYY-MM-DD') : '';
}
