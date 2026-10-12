FROM nginx:1.27-alpine
RUN apk add --no-cache openssl
COPY default.conf /etc/nginx/conf.d/default.conf
COPY 20-generate-dev-cert.sh /docker-entrypoint.d/20-generate-dev-cert.sh
RUN chmod +x /docker-entrypoint.d/20-generate-dev-cert.sh
