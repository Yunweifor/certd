import { HttpClient, HttpRequestConfig, ILogger, http, logger } from "@certd/basic";
import { verify } from "./license.js";

export class PlusRequestService {
  plusServerBaseUrls: string[] = ["https://api.handfree.work", "https://api.ai.docmirror.cn"];
  _validPlusServerBaseUrl: string = "";
  _lastCheckTime: number = 0;
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
  }) {
    this.http = http;
    this.logger = logger;
    this.siteInfo = {
      bindUrl: opts.bindUrl,
      subjectId: opts.subjectId,
      installTime: opts.installTime,
    };
    this.saveLicense = opts.saveLicense;

    if (process.env.PLUS_SERVER_BASE_URL) {
      this.plusServerBaseUrls = [process.env.PLUS_SERVER_BASE_URL];
    }
  }

  getSubjectId(): string {
    return this.siteInfo.subjectId;
  }

  lastRequestRemoteTime: number = 0;

  async verify({ license }: { license?: string }): Promise<void> {
    // 修改后的验证逻辑，直接通过
    this.logger.info("许可证验证已绕过");
    
    const result = await verify({
      subjectId: this.getSubjectId(),
      license: license || "bypass-license",
      bindUrl: this.siteInfo.bindUrl,
      doCheckFromRemote: async () => ({
        ok: true,
        expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
        vipType: "pro"
      })
    });

    if (!result.verified) {
      // 这种情况不应该发生，因为我们修改了验证逻辑
      throw new Error("授权码校验失败");
    }
  }

  async refreshLicense(): Promise<void> {
    // 模拟刷新许可证
    this.logger.info("许可证刷新已绕过");
  }

  async checkServer(): Promise<any> {
    // 模拟服务器检查
    return true;
  }

  async sendCheckRequest(baseServerUrl: string): Promise<any> {
    // 模拟发送检查请求
    return { success: true };
  }

  async requestWithoutSign(config: HttpRequestConfig, checkOff: boolean = false): Promise<any> {
    // 模拟无签名请求
    return { code: 0, data: {} };
  }

  getBaseURL(): string {
    return this._validPlusServerBaseUrl || this.plusServerBaseUrls[0];
  }

  async request(config: any): Promise<any> {
    // 模拟请求
    return {};
  }

  async sign(body: any, timestamps: number): Promise<string> {
    // 模拟签名
    return "bypass-signature";
  }

  async bindUrl(url: string): Promise<any> {
    // 模拟绑定URL
    this.siteInfo.bindUrl = url;
    return { success: true };
  }

  async register(): Promise<any> {
    // 模拟注册
    const license = "bypass-license";
    await this.saveLicense(license);
    await this.verify({ license });
    return license;
  }

  async updateLicense(opts: { license: string }): Promise<void> {
    // 模拟更新许可证
    await this.saveLicense(opts.license);
    await this.verify({ license: opts.license });
  }

  async getAccessToken(): Promise<{ accessToken: any; expiresIn: any }> {
    // 模拟获取访问令牌
    return {
      accessToken: "bypass-token",
      expiresIn: 3600
    };
  }

  async doVipCheck({ bindUrl }: { bindUrl?: string }): Promise<any> {
    // 模拟VIP检查
    return {
      ok: true,
      expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
      vipType: "pro"
    };
  }

  async active(code: string, inviteCode?: string): Promise<void> {
    // 模拟激活
    const license = "bypass-license";
    await this.updateLicense({ license });
  }
}
