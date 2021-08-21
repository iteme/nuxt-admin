import { AuthUser } from '../type/server';
import http from '../lib/http';
import cache from '../lib/cache';
import { weixinConfig } from '../config';
import logger from '../lib/logger';

const QR_URL = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${encodeURIComponent(
  weixinConfig.corpId
)}&agentid=${encodeURIComponent(weixinConfig.agentId)}&redirect_uri=${encodeURIComponent(
  weixinConfig.redirectUri
)}&state=STATE`;

const GET_TOKEN = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${encodeURIComponent(
  weixinConfig.corpId
)}&corpsecret=${encodeURIComponent(weixinConfig.corpSecret)}`;

const GET_USER_INFO = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo';

const GET_USER = 'https://qyapi.weixin.qq.com/cgi-bin/user/get';

const TOKEN_KEY = 'api:weixin:token';

export function getQrUrl(): string {
  return QR_URL;
}

export async function refreshAccessToken(): Promise<string | undefined> {
  cache.del(TOKEN_KEY);
  const res = await http.get(GET_TOKEN);
  logger.debug(`GET_TOKEN response=${JSON.stringify(res?.data)}`);
  if (res?.data.errcode === 0) {
    const token = res.data.access_token;
    const expire = res.data.expires_in;
    cache.set(TOKEN_KEY, token, expire);
    return token;
  }
}

export async function getAccessToken(): Promise<string> {
  let token = cache.get(TOKEN_KEY);

  if (!token) {
    token = await refreshAccessToken();
  }
  return token;
}

export async function getUserId(code: string): Promise<string | undefined> {
  const token = await getAccessToken();

  const params = {
    access_token: token,
    code,
  };
  const res = await http.get(GET_USER_INFO, { params });
  logger.debug(`GET_USER_INFO response=${JSON.stringify(res?.data)}`);
  if (res?.data.errcode === 0) {
    return res.data.UserId;
  }
}

export async function getUser(userId: string): Promise<AuthUser | undefined> {
  const token = await getAccessToken();
  const params = {
    access_token: token,
    userid: userId,
  };
  const res = await http.get(GET_USER, { params });
  logger.debug(`GET_USER response=${JSON.stringify(res?.data)}`);
  if (res?.data.errcode === 0) {
    const user = res.data;

    return {
      userId: user.userid,
      name: user.name,
      alias: user.alias,
      mobile: user.mobile,
      email: user.email,
      avatar: user.thumb_avatar,
      status: user.status,
    } as AuthUser;
  }
}
