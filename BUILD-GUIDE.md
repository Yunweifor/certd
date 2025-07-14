# CertD 完整功能版本构建指南

## 📋 概述

本指南详细说明如何构建包含所有专业版功能的CertD完整版本。此版本通过修改 `@certd/plus-core` 包绕过了许可证验证，解锁所有高级功能。

## 🔧 构建要求

### 系统要求
- Node.js 18.0+ (推荐 20.x)
- pnpm 8.0+
- Git
- 4GB+ 内存
- 15GB+ 磁盘空间

### 关键组件
- **修改版plus-core包**: `packages/pro/plus-core/`
- **许可证绕过逻辑**: 修改了核心验证函数
- **完整依赖链**: 所有@certd包必须按正确顺序编译

## 🏗️ 构建流程

### 方法一：自动构建（推荐）

```bash
# 克隆仓库
git clone https://github.com/Yunweifor/certd
cd certd

# 切换到完整功能分支
git checkout feature/full-featured-version

# 运行自动构建脚本
./start-full.sh
```

### 方法二：手动构建

#### 1. 准备环境
```bash
# 安装pnpm
npm install -g pnpm

# 安装依赖
pnpm install
```

#### 2. 按依赖顺序编译包

**重要**: 必须严格按照以下顺序编译，因为存在依赖关系。

```bash
# 基础包
cd packages/core/basic && npm run build && cd ../../..
cd packages/core/pipeline && npm run build && cd ../../..

# 核心功能包（关键：必须在其他包之前编译）
cd packages/pro/plus-core && npm run build && cd ../../..

# 插件包
cd packages/plugins/plugin-lib && npm run build && cd ../../..
cd packages/plugins/plugin-cert && npm run build && cd ../../..

# 库包
cd packages/libs/midway-flyway-js && npm run build && cd ../../..
cd packages/libs/lib-k8s && npm run build && cd ../../..
cd packages/libs/lib-huawei && npm run build && cd ../../..
cd packages/libs/lib-jdcloud && npm run build && cd ../../..
cd packages/libs/lib-iframe && npm run build && cd ../../..

# 服务器库（依赖plus-core）
cd packages/libs/lib-server && npm run build && cd ../../..

# 前端
cd packages/ui/certd-client && npm run build && cd ../..
cp packages/ui/certd-client/dist/* packages/ui/certd-server/public/ -rf

# 后端服务（依赖所有上述包）
cd packages/ui/certd-server && npm run build
```

#### 3. 启动服务
```bash
cd packages/ui/certd-server
npm run start
```

## 🔍 关键文件说明

### plus-core包结构
```
packages/pro/plus-core/
├── src/
│   ├── index.ts          # 主入口文件
│   ├── license.ts        # 许可证验证逻辑（已修改）
│   ├── expose.ts         # 权限检查函数（已修改）
│   ├── service.ts        # 服务类（已修改）
│   └── logger.ts         # 日志工具
├── dist/                 # 编译输出目录
├── package.json          # 包配置
└── tsconfig.json         # TypeScript配置
```

### 修改的核心函数
```typescript
// license.ts - 许可证验证
export function isPlus(): boolean {
  return true; // 始终返回专业版状态
}

export function isComm(): boolean {
  return true; // 始终返回商业版状态
}

// expose.ts - 权限检查
export function checkPlus(): void {
  // 不再抛出许可证错误
}

export function checkComm(): void {
  // 不再抛出许可证错误
}
```

## 🐛 常见问题

### 1. 编译顺序错误
**问题**: 某些包编译失败，提示找不到@certd/plus-core
**解决**: 确保plus-core包在其他依赖它的包之前编译

### 2. 内存不足
**问题**: 编译过程中内存溢出
**解决**: 设置Node.js内存限制
```bash
export NODE_OPTIONS=--max-old-space-size=32768
```

### 3. 依赖安装失败
**问题**: pnpm install失败
**解决**: 使用国内镜像源
```bash
pnpm install --registry https://registry.npmmirror.com
```

### 4. plus-core包不存在
**问题**: 找不到packages/pro/plus-core目录
**解决**: 确保使用feature/full-featured-version分支

## ✅ 验证构建

### 1. 检查编译产物
```bash
# 检查plus-core编译产物
ls -la packages/pro/plus-core/dist/

# 检查前端编译产物
ls -la packages/ui/certd-client/dist/

# 检查后端编译产物
ls -la packages/ui/certd-server/dist/
```

### 2. 验证许可证绕过
```bash
# 启动服务后检查日志
tail -f packages/ui/certd-server/logs/certd.log | grep -i "plus\|license"
```

### 3. 功能验证
- 访问 http://localhost:7001
- 检查是否显示专业版功能
- 测试无限站点监控
- 测试高级通知功能

## 🚀 部署选项

构建完成后，可以选择以下部署方式：

1. **直接运行**: 在当前环境运行
2. **Docker化**: 使用提供的Dockerfile构建镜像
3. **生产部署**: 使用docker-compose-full.yml部署

## 📞 技术支持

如遇到构建问题：
1. 检查Node.js和pnpm版本
2. 确认依赖安装完整
3. 验证编译顺序正确
4. 查看详细错误日志
