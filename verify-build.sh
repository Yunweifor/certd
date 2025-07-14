#!/bin/bash

# CertD 构建验证脚本
# 验证plus-core包和其他关键包的编译状态

set -e

echo "=========================================="
echo "CertD 构建验证脚本"
echo "=========================================="

# 检查plus-core包是否存在
if [ ! -d "packages/pro/plus-core" ]; then
    echo "❌ 错误: packages/pro/plus-core 目录不存在"
    exit 1
fi

echo "✅ plus-core包目录存在"

# 检查plus-core包的package.json
if [ ! -f "packages/pro/plus-core/package.json" ]; then
    echo "❌ 错误: packages/pro/plus-core/package.json 不存在"
    exit 1
fi

echo "✅ plus-core包配置文件存在"

# 检查关键源文件
key_files=(
    "packages/pro/plus-core/src/index.ts"
    "packages/pro/plus-core/src/license.ts"
    "packages/pro/plus-core/src/expose.ts"
    "packages/pro/plus-core/src/service.ts"
)

for file in "${key_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误: $file 不存在"
        exit 1
    fi
done

echo "✅ plus-core包关键源文件存在"

# 检查编译产物（如果存在）
if [ -d "packages/pro/plus-core/dist" ]; then
    echo "✅ plus-core包编译产物目录存在"
    
    dist_files=(
        "packages/pro/plus-core/dist/index.js"
        "packages/pro/plus-core/dist/license.js"
        "packages/pro/plus-core/dist/expose.js"
    )
    
    for file in "${dist_files[@]}"; do
        if [ -f "$file" ]; then
            echo "✅ $file 存在"
        else
            echo "⚠️  $file 不存在（需要编译）"
        fi
    done
else
    echo "⚠️  plus-core包编译产物目录不存在（需要编译）"
fi

# 检查依赖关系
echo ""
echo "=========================================="
echo "检查依赖关系"
echo "=========================================="

# 检查pipeline包是否依赖plus-core
if grep -q "@certd/plus-core" packages/core/pipeline/package.json; then
    echo "✅ pipeline包正确依赖plus-core"
else
    echo "❌ pipeline包未依赖plus-core"
fi

# 检查lib-server包是否依赖plus-core
if [ -f "packages/libs/lib-server/package.json" ]; then
    if grep -q "@certd/plus-core" packages/libs/lib-server/package.json; then
        echo "✅ lib-server包正确依赖plus-core"
    else
        echo "⚠️  lib-server包未依赖plus-core"
    fi
else
    echo "⚠️  lib-server包不存在"
fi

echo ""
echo "=========================================="
echo "验证完成"
echo "=========================================="
echo "如果所有检查都通过，可以运行以下命令进行构建："
echo "  ./start.sh        # 简化版构建脚本"
echo "  ./start-full.sh   # 详细版构建脚本"
