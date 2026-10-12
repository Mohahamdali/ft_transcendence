#!/bin/sh
set -eu
mkdir -p /etc/nginx/certs
if [ ! -f /etc/nginx/certs/dev.crt ] || [ ! -f /etc/nginx/certs/dev.key ]; then
  openssl req -x509 -nodes -days 30 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/dev.key -out /etc/nginx/certs/dev.crt \
    -subj '/CN=localhost' -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1'
fi
