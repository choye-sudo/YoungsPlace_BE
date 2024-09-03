# 베이스 이미지 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 애플리케이션 소스 복사
COPY package*.json ./

# 의존성 설치
RUN yarn install

# 애플리케이션 소스 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 애플리케이션 노출 포트
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["yarn", "start"]