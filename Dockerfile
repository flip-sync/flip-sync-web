# base 스테이지: node:18-alpine 이미지를 기반으로 합니다.
FROM node:18-alpine AS base

# deps 스테이지: 의존성 설치를 위한 단계입니다.
FROM base AS deps
RUN apk add --no-cache libc6-compat 
WORKDIR /usr/src/app
 
# 의존성 파일 복사 및 설치 
COPY package.json yarn.lock ./
RUN yarn install

# builder 스테이지: 소스 코드 빌드를 위한 단계입니다.
FROM base AS builder
WORKDIR /usr/src/app

# 빌드 시 환경변수 설정
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 설정 파일 먼저 복사
COPY tsconfig.json ./
COPY next.config.js ./

# 의존성과 소스 복사
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# package-lock.json 제거 후 빌드
RUN rm -f package-lock.json
RUN yarn install --production=false
RUN yarn build

# runner 스테이지: 최종 프로덕션 이미지입니다.
FROM base AS runner
WORKDIR /usr/src/app

# 보안을 위한 시스템 사용자 및 그룹 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드된 파일들을 복사합니다
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
