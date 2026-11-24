# NestJS Backend — Gelavu

NestJS + TypeScript + PostgreSQL (Docker) + TypeORM migrations + Swagger.

## Stack

- **NestJS** (TypeScript)
- **PostgreSQL** via Docker
- **TypeORM** (migrations; `synchronize` off by default)
- **Swagger** at `/api/docs`

## Architecture

Domain modules map **1:1 to site pages** from the ERD.

> **ERD rule:** no foreign keys — every table is independent.

## Getting started

### 1. Install

```bash
npm install
# or
pnpm install
```

### 2. Env

```bash
cp .env.example .env
```

### 3. Postgres

#### Option A: Docker Compose (Recommended)

Spins up both the PostgreSQL database and the NestJS backend together:

```bash
docker compose up -d --build
```

#### Option B: Standalone Postgres Docker Container

```bash
docker run -d --name gelavu_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gelavu_db -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
```

### 4. Migrations

```bash
# After entities exist / change:
npm run migration:generate -- src/database/migrations/InitSchema
npm run migration:run
```

For local bootstrap only you may set `DB_SYNCHRONIZE=true` once — keep it `false` in shared/prod environments.

### 5. Seed super-admin

```bash
npm run seed
```

Defaults (override via `SEED_ADMIN_*` in `.env`): `admin@gelavu.com` / `admin` / `Admin@12345`. Idempotent — skips if that user already exists.

### 6. Run

#### Using Docker (Port 4001)

```bash
# Start containers in background (development mode with watch/hot-reload)
docker compose up -d

# View container logs
docker compose logs -f

# Stop containers
docker compose down
```

#### Local (without Docker)

```bash
npm run start:dev
# or
pnpm run start:dev
```

- **API:** `http://localhost:4001/api`
- **Swagger:** `http://localhost:4001/api/docs`
- **Health:** `http://localhost:4001/api` (root controller)
