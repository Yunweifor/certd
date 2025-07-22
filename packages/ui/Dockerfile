FROM node:22-alpine AS builder
WORKDIR /workspace/
COPY . /workspace/
# armv7 目前只能用node18， pnpm9不支持node18,所以pnpm只能用8.15.7版本
# https://github.com/nodejs/docker-node/issues/1946
RUN npm install -g pnpm

#RUN cd /workspace/certd-client && pnpm install && npm run build
RUN cp /workspace/certd-client/dist/* /workspace/certd-server/public/ -rf
RUN cd /workspace/certd-server && pnpm install && npm run build-on-docker


FROM node:22-alpine
EXPOSE 7001
EXPOSE 7002
RUN apk add --no-cache openssl
RUN apk add --no-cache openjdk8
WORKDIR /app/
COPY --from=builder /workspace/certd-server/ /app/

ENV LEGO_VERSION=4.22.2
ENV LEGO_DOWNLOAD_DIR=/app/tools/lego
RUN mkdir -p $LEGO_DOWNLOAD_DIR

# 复制本地lego二进制文件（支持多架构）
COPY lego-binaries/lego_v${LEGO_VERSION}_linux_amd64.tar.gz $LEGO_DOWNLOAD_DIR/
COPY lego-binaries/lego_v${LEGO_VERSION}_linux_arm64.tar.gz $LEGO_DOWNLOAD_DIR/

ENV TZ=Asia/Shanghai
ENV NODE_ENV=production
ENV MIDWAY_SERVER_ENV=production
CMD ["npm", "run","start"]




