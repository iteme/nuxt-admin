import NP from 'number-precision';

type numType = number | string;

export function plus(num1: numType, num2: numType, ...others: numType[]) {
  return NP.plus(num1, num2, ...others);
}

export function minus(num1: numType, num2: numType, ...others: numType[]) {
  return NP.minus(num1, num2, ...others);
}

export function times(num1: numType, num2: numType, ...others: numType[]) {
  return NP.times(num1, num2, ...others);
}

export function divide(num1: numType, num2: numType, ...others: numType[]) {
  return NP.divide(num1, num2, ...others);
}

export function round(num: numType, ratio: number) {
  return NP.round(num, ratio);
}

export function ceil(num: numType, ratio: number) {
  const base = Math.pow(10, ratio);
  return divide(Math.ceil(times(num, base)), base);
}

export function floor(num: numType, ratio: number) {
  const base = Math.pow(10, ratio);
  return divide(Math.floor(times(num, base)), base);
}
