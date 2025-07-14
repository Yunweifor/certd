export declare const AppKey = "kQth6FHM71IPV3qdWc";
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
export declare function isPlus(): boolean;
export declare function getSecret(): string;
export declare function getExpiresTime(): number;
export declare function isComm(): boolean;
export declare function getPlusInfo(): {
    isPlus: boolean;
    isComm: boolean;
    vipType: string;
    expireTime: number;
    secret: string;
    originVipType: string;
};
export declare function getLicense(): any;
export declare function getLicenseReq(): any;
export declare function verify(req: LicenseVerifyReq): Promise<{
    verified: boolean;
    isPlus: boolean;
    isComm: boolean;
    expireTime: number;
    vipType: string;
    message?: string;
    secret?: string;
    originVipType?: string;
}>;
