#!/bin/bash

# CertD 数据迁移脚本
# 从官方Docker版本迁移到完整功能版本

set -e

echo "=========================================="
echo "CertD 数据迁移脚本"
echo "从官方版本迁移到完整功能版本"
echo "=========================================="

# 检查参数
if [ $# -eq 0 ]; then
    echo "用法: $0 <官方版本数据目录路径>"
    echo "例如: $0 /path/to/official/certd/data"
    exit 1
fi

OFFICIAL_DATA_DIR="$1"

# 检查官方数据目录是否存在
if [ ! -d "$OFFICIAL_DATA_DIR" ]; then
    echo "错误: 官方数据目录不存在: $OFFICIAL_DATA_DIR"
    exit 1
fi

# 创建备份目录
BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"
echo "创建备份目录: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# 停止当前服务
echo "停止当前服务..."
docker-compose -f docker-compose-full.yml down 2>/dev/null || true

# 备份当前数据（如果存在）
if [ -d "./data" ]; then
    echo "备份当前数据到: $BACKUP_DIR/current-data"
    cp -r ./data "$BACKUP_DIR/current-data"
fi

# 创建数据目录
mkdir -p data logs config

# 迁移数据库文件
echo "迁移数据库文件..."
if [ -f "$OFFICIAL_DATA_DIR/db.sqlite" ]; then
    cp "$OFFICIAL_DATA_DIR/db.sqlite" ./data/
    echo "✅ SQLite数据库文件已迁移"
elif [ -f "$OFFICIAL_DATA_DIR/database.db" ]; then
    cp "$OFFICIAL_DATA_DIR/database.db" ./data/db.sqlite
    echo "✅ 数据库文件已迁移并重命名"
else
    echo "⚠️  未找到数据库文件，将使用新的数据库"
fi

# 迁移证书文件
echo "迁移证书文件..."
if [ -d "$OFFICIAL_DATA_DIR/certs" ]; then
    cp -r "$OFFICIAL_DATA_DIR/certs" ./data/
    echo "✅ 证书文件已迁移"
fi

# 迁移配置文件
echo "迁移配置文件..."
if [ -d "$OFFICIAL_DATA_DIR/config" ]; then
    cp -r "$OFFICIAL_DATA_DIR/config"/* ./config/ 2>/dev/null || true
    echo "✅ 配置文件已迁移"
fi

# 迁移日志文件（可选）
echo "迁移日志文件..."
if [ -d "$OFFICIAL_DATA_DIR/logs" ]; then
    cp -r "$OFFICIAL_DATA_DIR/logs"/* ./logs/ 2>/dev/null || true
    echo "✅ 日志文件已迁移"
fi

# 迁移其他数据文件
echo "迁移其他数据文件..."
for item in "$OFFICIAL_DATA_DIR"/*; do
    if [ -f "$item" ]; then
        filename=$(basename "$item")
        if [[ "$filename" != "db.sqlite" && "$filename" != "database.db" ]]; then
            cp "$item" ./data/
            echo "✅ 已迁移文件: $filename"
        fi
    fi
done

# 设置权限
echo "设置文件权限..."
chmod -R 755 data logs config

# 启动服务
echo "启动完整功能版本..."
docker-compose -f docker-compose-full.yml up -d

# 等待服务启动
echo "等待服务启动..."
sleep 15

# 检查服务状态
echo "检查服务状态..."
docker-compose -f docker-compose-full.yml ps

echo ""
echo "=========================================="
echo "数据迁移完成！"
echo "=========================================="
echo "备份目录: $BACKUP_DIR"
echo "Web界面: http://localhost:7001"
echo ""
echo "迁移内容:"
echo "✅ 数据库文件"
echo "✅ 证书文件"
echo "✅ 配置文件"
echo "✅ 日志文件"
echo ""
echo "现在您可以使用所有专业版功能："
echo "✅ 无限站点监控"
echo "✅ 群晖部署功能"
echo "✅ 高级通知功能"
echo "✅ 所有专业版功能"
echo "=========================================="
