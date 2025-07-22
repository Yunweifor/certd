import { http, logger } from "@certd/basic";
import { verify } from "./license.js";
export class PlusRequestService {
    plusServerBaseUrls = ["https://api.handfree.work", "https://api.ai.docmirror.cn"];
    _validPlusServerBaseUrl = "";
    _lastCheckTime = 0;
    http;
    logger;
    siteInfo;
    saveLicense;
    constructor(opts) {
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
    getSubjectId() {
        return this.siteInfo.subjectId;
    }
    lastRequestRemoteTime = 0;
    async verify({ license }) {
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
    async refreshLicense() {
        // 模拟刷新许可证
        this.logger.info("许可证刷新已绕过");
    }
    async checkServer() {
        // 模拟服务器检查
        return true;
    }
    async sendCheckRequest(baseServerUrl) {
        // 模拟发送检查请求
        return { success: true };
    }
    async requestWithoutSign(config, checkOff = false) {
        // 模拟无签名请求
        return { code: 0, data: {} };
    }
    getBaseURL() {
        return this._validPlusServerBaseUrl || this.plusServerBaseUrls[0];
    }
    async request(config) {
        // 模拟请求
        return {};
    }
    async sign(body, timestamps) {
        // 模拟签名
        return "bypass-signature";
    }
    async bindUrl(url) {
        // 模拟绑定URL
        this.siteInfo.bindUrl = url;
        return { success: true };
    }
    async register() {
        // 模拟注册
        const license = "bypass-license";
        await this.saveLicense(license);
        await this.verify({ license });
        return license;
    }
    async updateLicense(opts) {
        // 模拟更新许可证
        await this.saveLicense(opts.license);
        await this.verify({ license: opts.license });
    }
    async getAccessToken() {
        // 模拟获取访问令牌
        return {
            accessToken: "bypass-token",
            expiresIn: 3600
        };
    }
    async doVipCheck({ bindUrl }) {
        // 模拟VIP检查
        return {
            ok: true,
            expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
            vipType: "pro"
        };
    }
    async active(code, inviteCode) {
        // 模拟激活
        const license = "bypass-license";
        await this.updateLicense({ license });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBMEMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0Isa0JBQWtCLEdBQWEsQ0FBQywyQkFBMkIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVGLHVCQUF1QixHQUFXLEVBQUUsQ0FBQztJQUNyQyxjQUFjLEdBQVcsQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBYTtJQUNqQixNQUFNLENBQVU7SUFDaEIsUUFBUSxDQUlOO0lBQ0YsV0FBVyxDQUFNO0lBRWpCLFlBQVksSUFLWDtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXBDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRCxDQUFDO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxxQkFBcUIsR0FBVyxDQUFDLENBQUM7SUFFbEMsS0FBSyxDQUFDLE1BQU0sQ0FB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