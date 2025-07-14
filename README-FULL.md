# CertD 完整功能版本

这是一个从源代码编译的CertD完整功能版本，已绕过许可证验证机制，包含所有专业版功能。

## 🚀 功能特性

✅ **无限站点监控** - 不受站点数量限制
✅ **群晖部署功能** - 支持群晖NAS自动部署
✅ **高级通知功能** - 支持多种通知方式
✅ **所有专业版功能** - 包含官方专业版的所有特性
✅ **已绕过许可证验证** - 无需购买许可证即可使用所有功能

## 🔓 许可证绕过技术说明

本版本通过修改 `@certd/plus-core` 包实现许可证验证绕过：

### 核心修改
- **位置**: `packages/pro/plus-core/`
- **修改的关键函数**:
  - `isPlus()` - 始终返回 `true`（专业版状态）
  - `isComm()` - 始终返回 `true`（商业版状态）
  - `checkPlus()` - 不再抛出许可证错误
  - `checkComm()` - 不再抛出许可证错误
  - `verify()` - 始终返回验证成功

### 技术实现
```typescript
// 示例：修改后的许可证验证函数
export function isPlus(): boolean {
  return true; // 始终返回专业版状态
}

export function checkPlus(): void {
  // 原本会检查专业版权限，现在直接通过
  // 不抛出任何错误
}
```

### 构建依赖关系
plus-core包必须在以下包之前编译：
- `@certd/lib-server`
- `@certd/ui-server` (certd-server)
- 所有依赖专业版功能的插件

## 📋 系统要求

### Docker部署
- Docker 20.10+
- Docker Compose 2.0+
- 2GB+ 内存
- 10GB+ 磁盘空间

### 源码编译部署
- Node.js 18.0+ (推荐 20.x)
- pnpm 8.0+
- 4GB+ 内存
- 15GB+ 磁盘空间

## 🏗️ 源码构建流程

如果选择从源码编译，构建过程会按以下顺序进行：

### 1. 基础包编译
```bash
packages/core/basic          # 基础工具包
packages/core/pipeline       # 管道处理包
```

### 2. 核心功能包编译（关键）
```bash
packages/pro/plus-core       # 修改版许可证包（必须优先编译）
```

### 3. 插件和库编译
```bash
packages/plugins/plugin-lib  # 插件库
packages/plugins/plugin-cert # 证书插件
packages/libs/*              # 各种服务库
```

### 4. 服务编译
```bash
packages/libs/lib-server     # 服务器库（依赖plus-core）
packages/ui/certd-client     # 前端界面
packages/ui/certd-server     # 后端服务（依赖所有上述包）
```

**重要**: plus-core包必须在lib-server和certd-server之前编译，因为它们依赖plus-core的许可证验证功能。

## 🛠️ 部署方式

### 方法一：Docker部署（推荐）

使用预构建的Docker镜像快速部署：

```bash
# 运行部署脚本
./deploy-full.sh
```

### 方法二：源码编译部署

从源码编译并运行（适合开发和自定义）：

```bash
# 运行完整功能版本构建脚本
./start-full.sh
```

### 方法三：手动Docker部署

```bash
# 创建数据目录
mkdir -p data logs config

# 启动服务
docker-compose -f docker-compose-full.yml up -d

# 查看服务状态
docker-compose -f docker-compose-full.yml ps
```

## 📦 从官方版本迁移数据

如果您之前使用过官方Docker版本，可以使用迁移脚本：

```bash
# 迁移数据（替换为您的官方版本数据目录路径）
./migrate-data.sh /path/to/official/certd/data
```

## 🌐 访问地址

- **Web界面**: http://localhost:7001
- **API接口**: http://localhost:7002

## 📁 目录结构

```
.
├── data/           # 数据持久化目录
│   ├── db.sqlite   # SQLite数据库文件
│   └── certs/      # 证书存储目录
├── logs/           # 日志文件目录
├── config/         # 配置文件目录
└── backup-*/       # 数据备份目录（迁移时创建）
```

## 🔧 常用命令

### Docker部署命令

```bash
# 查看服务状态
docker-compose -f docker-compose-full.yml ps

# 查看日志
docker-compose -f docker-compose-full.yml logs -f

# 重启服务
docker-compose -f docker-compose-full.yml restart

# 停止服务
docker-compose -f docker-compose-full.yml down

# 更新服务
docker-compose -f docker-compose-full.yml pull
docker-compose -f docker-compose-full.yml up -d
```

### 源码部署命令

```bash
# 重新构建和启动
./start-full.sh

# 查看运行日志（后台模式）
tail -f ./certd.log

# 停止服务（前台模式：Ctrl+C，后台模式：）
pkill -f "node ./bootstrap.js"
```

## 🗄️ 数据库配置

默认使用SQLite数据库，数据存储在`./data/db.sqlite`。

如需使用MySQL或PostgreSQL，请编辑`docker-compose-full.yml`文件中的数据库配置。

### MySQL配置示例

```yaml
environment:
  - DB_TYPE=mysql
  - DB_HOST=mysql
  - DB_PORT=3306
  - DB_USERNAME=certd
  - DB_PASSWORD=your_password
  - DB_DATABASE=certd
```

### PostgreSQL配置示例

```yaml
environment:
  - DB_TYPE=postgres
  - DB_HOST=postgres
  - DB_PORT=5432
  - DB_USERNAME=certd
  - DB_PASSWORD=your_password
  - DB_DATABASE=certd
```

## 🔒 安全说明

1. **端口安全**: 建议通过反向代理（如Nginx）访问，不要直接暴露端口到公网
2. **数据备份**: 定期备份`./data`目录中的重要数据
3. **访问控制**: 在生产环境中配置适当的访问控制和防火墙规则

## 🐛 故障排除

### 服务无法启动

```bash
# 查看详细日志
docker-compose -f docker-compose-full.yml logs

# 检查端口占用
netstat -tlnp | grep -E ':(7001|7002)'

# 重新构建镜像
docker-compose -f docker-compose-full.yml build --no-cache
```

### 数据库连接问题

```bash
# 检查数据库文件权限
ls -la data/

# 重置数据库（注意：会丢失所有数据）
rm -f data/db.sqlite
docker-compose -f docker-compose-full.yml restart
```

## 📝 更新日志

- **v1.36.5**: 基于官方v1.36.5版本编译，绕过许可证验证
- 包含所有专业版功能
- 支持无限站点监控
- 支持群晖部署
- 支持高级通知功能

## ⚖️ 许可证说明

本项目基于CertD开源版本（AGPL-3.0协议）编译，仅用于学习和研究目的。

原项目地址：https://github.com/certd/certd

## 🤝 支持

如有问题，请检查：
1. Docker和Docker Compose是否正确安装
2. 端口7001和7002是否被占用
3. 数据目录权限是否正确
4. 查看容器日志获取详细错误信息
