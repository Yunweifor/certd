import { getLogger } from "./logger.js";
export const AppKey = "kQth6FHM71IPV3qdWc";
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
export function isPlus() {
    return true;
}
// 始终返回secret
export function getSecret() {
    return plusInfo.secret;
}
// 返回过期时间（1年后）
export function getExpiresTime() {
    return plusInfo.expireTime;
}
// 始终返回true，表示是商业版
export function isComm() {
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
export function getLicense() {
    return {
        license: "bypass-license"
    };
}
// 模拟许可证请求数据
export function getLicenseReq() {
    return {
        subjectId: "bypass-subject",
        license: "bypass-license",
        bindUrl: "http://localhost"
    };
}
// 修改后的验证函数，始终返回成功
export async function verify(req) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGljZW5zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9saWNlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEMsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLG9CQUFvQixDQUFDO0FBZ0IzQyxzQkFBc0I7QUFDdEIsTUFBTSxRQUFRLEdBQUc7SUFDZixRQUFRLEVBQUUsSUFBSTtJQUNkLE1BQU0sRUFBRSxJQUFJO0lBQ1osTUFBTSxFQUFFLElBQUk7SUFDWixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsUUFBUTtJQUM1RCxPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLGFBQWEsRUFBRSxLQUFLO0NBQ3JCLENBQUM7QUFFRixrQkFBa0I7QUFDbEIsTUFBTSxVQUFVLE1BQU07SUFDcEIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsYUFBYTtBQUNiLE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUN6QixDQUFDO0FBRUQsY0FBYztBQUNkLE1BQU0sVUFBVSxjQUFjO0lBQzVCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQztBQUM3QixDQUFDO0FBRUQsa0JBQWtCO0FBQ2xCLE1BQU0sVUFBVSxNQUFNO0lBQ3BCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELFVBQVU7QUFDVixNQUFNLFVBQVUsV0FBVztJQUN6QixPQUFPO1FBQ0wsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1FBQy9CLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtRQUN2QixhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0FBQ0osQ0FBQztBQUVELFVBQVU7QUFDVixNQUFNLFVBQVUsVUFBVTtJQUN4QixPQUFPO1FBQ0wsT0FBTyxFQUFFLGdCQUFnQjtLQUMxQixDQUFDO0FBQ0osQ0FBQztBQUVELFlBQVk7QUFDWixNQUFNLFVBQVUsYUFBYTtJQUMzQixPQUFPO1FBQ0wsU0FBUyxFQUFFLGdCQUFnQjtRQUMzQixPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLE9BQU8sRUFBRSxrQkFBa0I7S0FDNUIsQ0FBQztBQUNKLENBQUM7QUFFRCxrQkFBa0I7QUFDbEIsTUFBTSxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUMsR0FBcUI7SUFVaEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRWhDLE9BQU87UUFDTCxRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7UUFDL0IsT0FBTyxFQUFFLEtBQUs7UUFDZCxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07UUFDdkIsYUFBYSxFQUFFLEtBQUs7S0FDckIsQ0FBQztBQUNKLENBQUMifQ==