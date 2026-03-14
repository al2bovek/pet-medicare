# pet-service
# pet-medicare

PORT=5000
NODE_ENV=development

DB_HOST=postgres
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres

PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin

JWT_ACCESS_SECRET=access_secret_key
JWT_REFRESH_SECRET=refresh_secret_key

JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=30d

DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
# postgresql://postgres:postgres@postgres:5432/postgres

CLIENT_URL=http://localhost:5173
