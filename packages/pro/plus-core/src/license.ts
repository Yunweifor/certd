import { getLogger } from "./logger.js";

export const AppKey = "kQth6FHM71IPV3qdWc";

export type CheckRes = {
  ok: boolean;
  message?: string;
  expiresAt?: number;
  vipType?: string;
};

export type LicenseVerifyReq = {
  subjectId: string;
  license: string;
  bindUrl?: string;
  doCheckFromRemote: () => Promise<CheckRes>;
};

// 修改后的许可证信息，始终返回专业版状态
const plusInfo = {
  verified: true,
  isPlus: true,
  isComm: true,
  expireTime: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1年后过期
  vipType: "pro",
  message: undefined,
  secret: "bypass-secret",
  originVipType: "pro"
};

// 始终返回true，表示是专业版
export function isPlus(): boolean {
  return true;
}

// 始终返回secret
export function getSecret(): string {
  return plusInfo.secret;
}

// 返回过期时间（1年后）
export function getExpiresTime(): number {
  return plusInfo.expireTime;
}

// 始终返回true，表示是商业版
export function isComm(): boolean {
  return true;
}

// 返回专业版信息
export function getPlusInfo() {
  return {
    isPlus: true,
    isComm: true,
    vipType: "pro",
    expireTime: plusInfo.expireTime,
    secret: plusInfo.secret,
    originVipType: "pro"
  };
}

// 模拟许可证数据
export function getLicense(): any {
  return {
    license: "bypass-license"
  };
}

// 模拟许可证请求数据
export function getLicenseReq(): any {
  return {
    subjectId: "bypass-subject",
    license: "bypass-license",
    bindUrl: "http://localhost"
  };
}

// 修改后的验证函数，始终返回成功
export async function verify(req: LicenseVerifyReq): Promise<{
  verified: boolean;
  isPlus: boolean;
  isComm: boolean;
  expireTime: number;
  vipType: string;
  message?: string;
  secret?: string;
  originVipType?: string;
}> {
  const logger = getLogger();
  
  logger.info("许可证验证已绕过，返回专业版状态");
  
  return {
    verified: true,
    isPlus: true,
    isComm: true,
    expireTime: plusInfo.expireTime,
    vipType: "pro",
    secret: plusInfo.secret,
    originVipType: "pro"
  };
}
