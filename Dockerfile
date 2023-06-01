FROM nginx

COPY dist /etc/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf