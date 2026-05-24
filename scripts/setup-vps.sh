#!/bin/bash
# Script para configurar o VPS da Hostinger na primeira vez
# Execute no seu VPS como root: bash setup-vps.sh

set -e

echo "==> Atualizando pacotes..."
apt-get update -y && apt-get upgrade -y

echo "==> Instalando Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "==> Instalando PM2 (gerenciador de processos)..."
npm install -g pm2

echo "==> Instalando Nginx..."
apt-get install -y nginx

echo "==> Configurando diretório da aplicação..."
mkdir -p /var/www/ameizze3d
cd /var/www/ameizze3d

echo "==> Clonando repositório..."
git clone https://github.com/dariomigliaccio-new/ameizze3D.git .

echo "==> Instalando dependências..."
npm ci --omit=dev

echo "==> Build da aplicação..."
npm run build

echo "==> Iniciando com PM2..."
pm2 start npm --name "ameizze3d" -- start
pm2 save
pm2 startup

echo "==> Configurando Nginx como proxy reverso..."
cat > /etc/nginx/sites-available/ameizze3d << 'EOF'
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/ameizze3d /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo ""
echo "==> Setup concluido!"
echo "    Substitua 'seudominio.com' no Nginx pelo seu dominio real."
echo "    Para SSL (HTTPS), instale o Certbot: apt-get install -y certbot python3-certbot-nginx"
echo "    Depois execute: certbot --nginx -d seudominio.com -d www.seudominio.com"
