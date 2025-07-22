import { HttpClient, HttpRequestConfig, ILogger } from "@certd/basic";
export declare class PlusRequestService {
    plusServerBaseUrls: string[];
    _validPlusServerBaseUrl: string;
    _lastCheckTime: number;
    http: HttpClient;
    logger: ILogger;
    siteInfo: {
        subjectId: string;
        bindUrl?: string;
        installTime: number;
    };
    saveLicense: any;
    constructor(opts: {
        subjectId: string;
        installTime: number;
        bindUrl?: string;
        saveLicense: (license: string) => Promise<void>;
    });
    getSubjectId(): string;
    lastRequestRemoteTime: number;
    verify({ license }: {
        license?: string;
    }): Promise<void>;
    refreshLicense(): Promise<void>;
    checkServer(): Promise<any>;
    sendCheckRequest(baseServerUrl: string): Promise<any>;
    requestWithoutSign(config: HttpRequestConfig, checkOff?: boolean): Promise<any>;
    getBaseURL(): string;
    request(config: any): Promise<any>;
    sign(body: any, timestamps: number): Promise<string>;
    bindUrl(url: string): Promise<any>;
    register(): Promise<any>;
    updateLicense(opts: {
        license: string;
    }): Promise<void>;
    getAccessToken(): Promise<{
        accessToken: any;
        expiresIn: any;
    }>;
    doVipCheck({ bindUrl }: {
        bindUrl?: string;
    }): Promise<any>;
    active(code: string, inviteCode?: string): Promise<void>;
}
