# ============================================================
# Desa Wisata Kangbejo – Dockerfile
# Menggunakan Nginx Alpine untuk serve static website
# ============================================================

# Base image ringan: nginx + alpine linux
FROM nginx:alpine

# Label metadata
LABEL maintainer="NoFreee"
LABEL description="Website Company Profile Desa Wisata Kangbejo"
LABEL version="1.0.0"

# Hapus default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy semua file website ke folder nginx
COPY . /usr/share/nginx/html/

# Pastikan permission benar
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
