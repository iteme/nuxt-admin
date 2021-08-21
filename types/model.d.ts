// menu
export interface MenuItem {
  code: string;
  name: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

// auth
export interface AuthLoginParam {
  phone: string;
  password: string;
}

export interface AuthQrLoginParam {
  code: string;
}

// user
export interface UserPasswordParam {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export interface ListUserParams extends BasePageQuery {}

export interface AddUserParams {
  name: string;
  phone: string;
  email: string;
}

// world
export interface ListWorldParams extends BasePageQuery {
  type: string;
}

export interface AddWorldParams {
  type: string;
  code: string;
  nameCn: string;
  nameEn: string;
}

// dict
export interface ListDictParams extends BasePageQuery {}

// freightAgent

export interface ListFreightAgentParams extends BasePageQuery {
  nation?: string;
}
export interface AddFreightAgentParams {
  nation: string;
  code: string;
  city: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

// freightRate
export interface ListFreightRateParams extends BasePageQuery {
  destination?: string;
}

export interface AddFreightRateParams {
  departure: string;
  destination: string;
  agentCode: string;
  type: string;
  grade: string;
  currency: string;
  minShippingTime: number;
  maxShippingTime: number;
  effectiveDate: number;
  subRate: any[];
}

interface FreightRateSub {
  min: number;
  max: number;
  rate: number;
}

interface FreightRate {
  agentCode: string;
  type: string;
  grade: string;
  currency: string;
  minimum: number;
  subRate: FreightRateSub[];
}

// freightOrder
export interface ListFreightOrderParams extends BasePageQuery {
  status?: string;
  receiverCountry?: string;
  canceled?: string;
}

export interface AddFreightOrderParams {
  senderCountry: string;
  senderProvince: string;
  senderCity: string;
  senderAddress: string;
  senderName: string;
  senderPhone: string;
  receiverCountry: string;
  receiverProvince: string;
  receiverCity: string;
  receiverAddress: string;
  receiverName: string;
  receiverPhone: string;
  agentCode: string;
  freightType: string;
  freightGrade: string;
  rate: number;
  rateUnit: string;
  currency: string;
  totalSurcharge: number;
  totalCost: number;
  totalVolume: number;
  totalWeight: number;
  totalValue: number;
  totalQuantity: number;
  orderInfoList: any[];
}

export interface FreightOrderSheet {
  index?: number;
  orderNo: string;
  barcode: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  freightType: string;
  departure: string;
  destination: string;
  orderDate: string;
  count: number;
  notice: string;
}

// freightOrderInfo
interface FreightOrderInfo {
  weight: number;
  volume: number;
  length: number;
  width: number;
  height: number;
  quantity: number;
  value: number;
  checkList: any[];
}

// product

export interface ListProductParams extends BasePageQuery {
  categoryId: number;
  status: string;
}

export interface AddProductParams {
  categoryId: number;
  name: string;
  description: string;
  status: string;
  subPrice: any[];
  link: string;
  images: string[];
}

export interface ProductPriceSub {
  min: number;
  max: number;
  price: number;
}

// world
export interface ListBusinessCustomerParams extends BasePageQuery {
  mobile?: string;
  nation?: string;
  status?: string;
  name?: string;
}
