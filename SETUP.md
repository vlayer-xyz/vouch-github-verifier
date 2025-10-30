## Create .env File

Prisma reads from `.env` (not `.env.local`). Create a `.env` file with:

```bash
POSTGRES_URL=postgresql://neondb_owner:npg_lLp7VYicMeT8@ep-misty-fire-a44y06gt-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

(Use your actual Neon connection string from `.env.local`)

## Generate Prisma Client

```bash
npx prisma generate
```

This creates the TypeScript types based on your schema.

## Run Database Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create the `web_proofs` table in your Neon database
- Apply the migration
- Mark it as applied in your database

## Verify Setup

You can open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can see your `web_proofs` table.

## Run Your App

```bash
pnpm dev
```

Visit `http://localhost:3000` - the webhook URL is now automatically set to your local app.