# CertD 编译顺序详细说明

## 📋 概述

本文档详细说明CertD完整功能版本的正确编译顺序。**编译顺序至关重要**，因为包之间存在依赖关系，错误的顺序会导致编译失败。

## ⚠️ 关键要点

1. **plus-core包必须在lib-server之前编译** - 这是最重要的依赖关系
2. **所有lib包必须在前端编译前完成** - 前端会引用这些包
3. **基础包必须最先编译** - 其他包都依赖基础包

## 🏗️ 正确的编译顺序

### 第一阶段：核心包编译

```bash
# 1. 基础工具包 (所有包的基础依赖)
cd packages/core/basic && npm run build && cd ../../..

# 2. 管道处理包 (依赖basic)
cd packages/core/pipeline && npm run build && cd ../../..

# 3. 插件库 (依赖basic和pipeline)
cd packages/plugins/plugin-lib && npm run build && cd ../../..

# 4. 证书插件 (依赖plugin-lib)
cd packages/plugins/plugin-cert && npm run build && cd ../../..
```

### 第二阶段：关键包编译

```bash
# 5. 完整功能包 - 修改版许可证包 ⭐ 最关键
cd packages/pro/plus-core && npm run build && cd ../../..
```

**说明**：
- 这是我们修改的核心包，包含许可证绕过逻辑
- **必须在lib-server之前编译**
- 包含专业版功能解锁代码

### 第三阶段：依赖库编译

```bash
# 6. 各种功能库 (部分依赖plus-core)
cd packages/libs/midway-flyway-js && npm run build && cd ../../..
cd packages/libs/lib-k8s && npm run build && cd ../../..
cd packages/libs/lib-huawei && npm run build && cd ../../..
cd packages/libs/lib-jdcloud && npm run build && cd ../../..
cd packages/libs/lib-iframe && npm run build && cd ../../..

# 7. 服务器库 (依赖plus-core) ⚠️ 必须在plus-core之后
cd packages/libs/lib-server && npm run build && cd ../../..
```

### 第四阶段：前端和后端编译

```bash
# 8. 前端界面 (依赖所有上述包)
cd packages/ui/certd-client && npm run build && cd ../..

# 9. 复制前端产物
cp -r packages/ui/certd-client/dist/* packages/ui/certd-server/public/

# 10. 后端服务 (依赖所有包)
cd packages/ui/certd-server && npm run build && cd ../..
```

## 🔍 依赖关系图

```
basic
  ↓
pipeline (依赖 basic)
  ↓
plugin-lib (依赖 basic, pipeline)
  ↓
plugin-cert (依赖 plugin-lib)
  ↓
plus-core (依赖 basic, pipeline) ⭐ 关键包
  ↓
lib-* 包 (部分依赖 plus-core)
  ↓
lib-server (依赖 plus-core) ⚠️ 重要依赖
  ↓
certd-client (依赖 所有lib包)
  ↓
certd-server (依赖 所有包)
```

## ❌ 常见错误

### 错误1：plus-core在lib-server之后编译
```bash
# ❌ 错误顺序
cd packages/libs/lib-server && npm run build  # 会失败
cd packages/pro/plus-core && npm run build    # 太晚了
```

**错误信息**：
```
Cannot find module '@certd/plus-core'
```

### 错误2：缺少lib包编译
```bash
# ❌ 缺少lib包编译，直接编译前端
cd packages/ui/certd-client && npm run build  # 会失败
```

**错误信息**：
```
Failed to resolve entry for package "@certd/lib-iframe"
```

### 错误3：基础包未优先编译
```bash
# ❌ 跳过基础包
cd packages/core/pipeline && npm run build  # 会失败
```

## ✅ 验证编译顺序

使用验证脚本检查编译环境：

```bash
./verify-build.sh
```

## 🚀 自动化编译

使用我们提供的脚本自动按正确顺序编译：

```bash
# 简化版（推荐）
./start.sh

# 详细版
./start-full.sh
```

## 🔧 手动编译模板

如果需要手动编译，请严格按照以下模板：

```bash
#!/bin/bash
set -e

# 设置内存限制
export NODE_OPTIONS=--max-old-space-size=32768

# 第一阶段：核心包
cd packages/core/basic && npm run build && cd ../../..
cd packages/core/pipeline && npm run build && cd ../../..
cd packages/plugins/plugin-lib && npm run build && cd ../../..
cd packages/plugins/plugin-cert && npm run build && cd ../../..

# 第二阶段：关键包 ⭐
cd packages/pro/plus-core && npm run build && cd ../../..

# 第三阶段：依赖库
cd packages/libs/midway-flyway-js && npm run build && cd ../../..
cd packages/libs/lib-k8s && npm run build && cd ../../..
cd packages/libs/lib-huawei && npm run build && cd ../../..
cd packages/libs/lib-jdcloud && npm run build && cd ../../..
cd packages/libs/lib-iframe && npm run build && cd ../../..
cd packages/libs/lib-server && npm run build && cd ../../..

# 第四阶段：前端后端
cd packages/ui/certd-client && npm run build && cd ../..
cp -r packages/ui/certd-client/dist/* packages/ui/certd-server/public/
cd packages/ui/certd-server && npm run build && cd ../..
```

## 📝 总结

记住这个关键顺序：
1. **basic** → **pipeline** → **plugins** 
2. **plus-core** ⭐ (关键包)
3. **lib-*** → **lib-server** (依赖plus-core)
4. **certd-client** → **certd-server**

遵循这个顺序，您的CertD完整功能版本就能成功编译！
