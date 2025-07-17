#!/bin/bash

# CertD 完整功能版本构建和启动脚本
# 此版本包含修改的plus-core包，支持所有专业版功能

set -e

echo "=========================================="
echo "CertD 完整功能版本构建和启动脚本"
echo "=========================================="
echo "此版本包含以下特性："
echo "✅ 无限站点监控"
echo "✅ 群晖部署功能"
echo "✅ 高级通知功能"
echo "✅ 所有专业版功能"
echo "✅ 已绕过许可证验证"
echo "=========================================="

# 检查是否存在plus-core包
if [ ! -d "packages/pro/plus-core" ]; then
    echo "❌ 错误: packages/pro/plus-core 目录不存在"
    echo "请确保您使用的是完整功能版本的源码"
    exit 1
fi

echo "✅ 检测到完整功能版本的plus-core包"

# 检查输入是否正确 循环输入
while true; do
  echo "是否后台运行(第一次运行建议选择n，调试没有问题之后，重新运行，选择y)"
  read -p "y/n: " confirmNohup
  # 校验输入是否正确
  if [ $confirmNohup != "y" ] && [ $confirmNohup != "n" ]; then
    echo "输入错误"
  else
    break
  fi
done

echo "安装pnpm, 前提是已经安装了nodejs"
npm install -g pnpm --registry https://registry.npmmirror.com

echo "安装依赖"
pnpm install --registry https://registry.npmmirror.com

echo "=========================================="
echo "开始构建 - 按依赖关系顺序编译"
echo "=========================================="

# 设置内存限制
export NODE_OPTIONS=--max-old-space-size=32768

# 2. 按依赖关系编译所有包
echo "=========================================="
echo "📋 编译顺序说明："
echo "1. basic (基础工具包)"
echo "2. pipeline (管道处理包)"
echo "3. plugin-lib (插件库)"
echo "4. plugin-cert (证书插件)"
echo "5. plus-core (修改版许可证包) ⭐ 关键包"
echo "6. 各种lib包 (依赖plus-core的库)"
echo "7. lib-server (服务器库，依赖plus-core)"
echo "=========================================="

echo "📦 1/7 编译基础包 @certd/basic"
cd packages/core/basic && npm run build && cd ../../..

echo "📦 2/7 编译管道包 @certd/pipeline"
cd packages/core/pipeline && npm run build && cd ../../..

echo "📦 3/7 编译插件库 @certd/plugin-lib"
cd packages/plugins/plugin-lib && npm run build && cd ../../..

echo "📦 4/7 编译证书插件 @certd/plugin-cert"
cd packages/plugins/plugin-cert && npm run build && cd ../../..

echo "📦 5/7 编译完整功能包 @certd/plus-core (包含许可证绕过) ⭐"
echo "      ⚠️  关键：此包必须在lib-server之前编译"
cd packages/pro/plus-core && npm run build && cd ../../..

echo "📦 6/7 编译其他依赖库包"
echo "      编译中间件包 @certd/midway-flyway-js"
cd packages/libs/midway-flyway-js && npm run build && cd ../../..

echo "      编译K8s库 @certd/lib-k8s"
cd packages/libs/lib-k8s && npm run build && cd ../../..

echo "      编译华为云库 @certd/lib-huawei"
cd packages/libs/lib-huawei && npm run build && cd ../../..

echo "      编译京东云库 @certd/lib-jdcloud"
cd packages/libs/lib-jdcloud && npm run build && cd ../../..

echo "      编译iframe库 @certd/lib-iframe"
cd packages/libs/lib-iframe && npm run build && cd ../../..

echo "📦 7/7 编译服务器库 @certd/lib-server (依赖plus-core)"
cd packages/libs/lib-server && npm run build && cd ../../..

# 3. 编译前端和后端
echo "=========================================="
echo "📋 编译前端和后端服务"
echo "=========================================="

echo "📦 编译前端界面 certd-client"
cd packages/ui/certd-client && npm run build && cd ../..
echo "📋 复制前端构建产物到服务器public目录"
cp -r packages/ui/certd-client/dist/* packages/ui/certd-server/public/

echo "📦 编译后端服务 certd-server (依赖所有上述包)"
cd packages/ui/certd-server && npm run build && cd ../..

echo "=========================================="
echo "✅ 构建完成！"
echo "=========================================="
echo "🌟 所有专业版功能已解锁："
echo "✅ 无限站点监控"
echo "✅ 群晖部署功能"
echo "✅ 高级通知功能"
echo "✅ 许可证验证已绕过"
echo "=========================================="
echo "🚀 启动服务"

# 前台运行
if [ $confirmNohup != "y" ]; then
  echo "当前运行模式为前台运行，ctrl+c或者关闭ssh将会停止运行"
  echo "Web界面: http://localhost:7001"
  echo "API接口: https://localhost:7002"
  npm run start
else
  echo "当前运行模式为后台运行，可以通过tail -f ./certd.log 命令查看日志"
  echo "Web界面: http://localhost:7001"
  echo "API接口: https://localhost:7002"
  nohup npm run start > certd.log &
  echo "服务已在后台启动，日志文件: ./certd.log"
fi


