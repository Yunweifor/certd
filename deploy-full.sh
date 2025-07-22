#!/bin/bash

# CertD 完整功能版本部署脚本
# 此版本已绕过许可证验证，包含所有专业版功能

set -e

echo "=========================================="
echo "CertD 完整功能版本部署脚本"
echo "=========================================="

# 创建必要的目录
echo "创建数据目录..."
mkdir -p data logs config

# 设置目录权限
echo "设置目录权限..."
chmod 755 data logs config

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查docker-compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "错误: docker-compose 未安装，请先安装 docker-compose"
    exit 1
fi

# 停止可能存在的旧容器
echo "停止旧容器..."
docker-compose -f docker-compose-full.yml down 2>/dev/null || true

# 启动服务
echo "启动 CertD 完整功能版本..."
docker-compose -f docker-compose-full.yml up -d

# 等待服务启动
echo "等待服务启动..."
sleep 10

# 检查服务状态
echo "检查服务状态..."
docker-compose -f docker-compose-full.yml ps

# 显示访问信息
echo ""
echo "=========================================="
echo "部署完成！"
echo "=========================================="
echo "Web界面访问地址: http://localhost:7001"
echo "API接口地址: http://localhost:7002"
echo ""
echo "数据目录: ./data"
echo "日志目录: ./logs"
echo "配置目录: ./config"
echo ""
echo "功能特性:"
echo "✅ 无限站点监控"
echo "✅ 群晖部署功能"
echo "✅ 高级通知功能"
echo "✅ 所有专业版功能"
echo "✅ 已绕过许可证验证"
echo ""
echo "查看日志: docker-compose -f docker-compose-full.yml logs -f"
echo "停止服务: docker-compose -f docker-compose-full.yml down"
echo "重启服务: docker-compose -f docker-compose-full.yml restart"
echo "=========================================="
