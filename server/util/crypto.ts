import crypto from 'crypto';

export function md5(text: string, salt?: string): string {
  const algorithm = salt ? crypto.createHmac('md5', salt) : crypto.createHash('md5');
  return algorithm.update(text).digest('hex').toString();
}

export function randomString(num: number): string {
  num = num || 16;
  const words = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  const lenth = words.length;
  let str = '';
  for (let i = 0; i < num; i++) {
    str += words.charAt(Math.floor(Math.random() * lenth));
  }
  return str;
}
