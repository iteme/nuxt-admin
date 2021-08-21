import moment from 'moment';

export function toNormalDate(timestamp: number): string {
  if (!timestamp) {
    return '';
  }
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  return moment(timestamp).format('YYYY-MM-DD');
}

export function toNormalDateTime(timestamp: number): string {
  if (!timestamp) {
    return '';
  }
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
