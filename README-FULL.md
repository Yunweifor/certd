# CertD 完整功能版本

这是一个从源代码编译的CertD完整功能版本，已绕过许可证验证机制，包含所有专业版功能。

## 🚀 功能特性

✅ **无限站点监控** - 不受站点数量限制  
✅ **群晖部署功能** - 支持群晖NAS自动部署  
✅ **高级通知功能** - 支持多种通知方式  
✅ **所有专业版功能** - 包含官方专业版的所有特性  
✅ **已绕过许可证验证** - 无需购买许可证即可使用所有功能  

## 📋 系统要求

- Docker 20.10+
- Docker Compose 2.0+
- 2GB+ 内存
- 10GB+ 磁盘空间

## 🛠️ 快速部署

### 方法一：使用部署脚本（推荐）

```bash
# 运行部署脚本
./deploy-full.sh
```

### 方法二：手动部署

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
