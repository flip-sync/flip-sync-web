# 이 Dockerfile은 Next.js 애플리케이션을 위한 멀티 스테이지 빌드 설정입니다.

# base 스테이지: node:18-alpine 이미지를 기반으로 합니다.
FROM node:18-alpine AS base

# deps 스테이지: 의존성 설치를 위한 단계입니다.
FROM base AS deps
RUN apk add --no-cache libc6-compat  # Alpine Linux 호환성 패키지 설치
WORKDIR /usr/src/app

# package.json과 yarn.lock을 복사하고 의존성을 설치합니다.
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production;
RUN rm -rf ./.next/cache  # 캐시 제거로 이미지 크기 최적화

# builder 스테이지: 소스 코드 빌드를 위한 단계입니다.
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN yarn build

# runner 스테이지: 최종 프로덕션 이미지입니다.
FROM base AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# 보안을 위한 시스템 사용자 및 그룹 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드된 파일들을 복사합니다
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# 보안을 위해 nextjs 사용자로 전환
USER nextjs

# 3000번 포트 노출
EXPOSE 3000

ENV PORT=3000

# 서버 실행 명령
CMD ["node", "server.js"]