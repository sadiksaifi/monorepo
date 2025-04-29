# Kin Technology Backend Package

This package contains the backend services for the Kin Technology monorepo, providing type-safe APIs and database management for all applications in the workspace.

## 🛠️ Tech Stack

- **API Layer**: [tRPC](https://trpc.io/) for end-to-end type-safe APIs
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access
- **Authentication**: Custom authentication with [better-auth](https://github.com/better-auth/better-auth)
- **Schema Validation**: [Zod](https://zod.dev/) for runtime validation
- **Database**: PostgreSQL

## 📁 Structure

```
packages/backend/
├── src/
│   ├── db/
│   │   ├── schema/        # Database schema definitions
│   │   ├── migrations/    # Database migrations
│   │   └── index.ts       # Database client setup
│   │
│   ├── trpc/
│   │   ├── routers/       # tRPC route definitions
│   │   ├── context.ts     # tRPC context setup
│   │   └── index.ts       # tRPC router setup
│   │
│   ├── auth/              # Authentication with better-auth
│   │   ├── providers/     # Auth providers configuration
│   │   ├── session.ts     # Session management
│   │   └── index.ts       # Auth setup and exports
│   │
│   └── utils/             # Utility functions
│
├── drizzle.config.ts      # Drizzle ORM configuration
└── index.ts               # Main package entry point
```

## 🚀 Getting Started

### Installation

This package is included in the monorepo's workspace setup. To install dependencies:

```bash
# From the root of the monorepo
pnpm install
```

### Database Setup

1. Set up your database environment variables in `.env` file:

```
# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/your-database"

# Authentication Configuration
AUTH_SECRET="your-auth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

2. Initialize the database schema:

```bash
# From the monorepo root
pnpm backend db push
```

## 🔄 Database Operations

### Generate Migrations

When you make changes to the schema files, generate a new migration:

```bash
pnpm backend db generate
```

### Run Migrations

To apply pending migrations:

```bash
pnpm backend db migrate
```

### Studio

To explore your database with Drizzle Studio:

```bash
pnpm backend db studio
```

## 🔌 tRPC API

### Router Structure

The tRPC API is organized into modular routers:

- `userRouter`: User management operations
- `authRouter`: Authentication operations
- `productRouter`: Product management operations
- ...and more

### Creating a New Router

1. Create a new file in `src/trpc/routers/` directory:

```typescript
// src/trpc/routers/example.ts
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Query logic here
    return { items: [] };
  }),
  
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create logic here
      return { success: true };
    }),
});
```

2. Add the router to the main router in `src/trpc/index.ts`:

```typescript
import { exampleRouter } from "./routers/example";

export const appRouter = router({
  // Other routers...
  example: exampleRouter,
});
```

## 📊 Database Schema

### Creating a New Schema

1. Create a new file in `src/db/schema/` directory:

```typescript
// src/db/schema/example.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const examples = pgTable("examples", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertExampleSchema = createInsertSchema(examples);
export const selectExampleSchema = createSelectSchema(examples);
export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
```

2. Export the schema in `src/db/schema/index.ts`:

```typescript
export * from "./example";
```

## 🔐 Authentication

This package uses a custom implementation of the better-auth library for authentication. The tRPC context automatically handles authentication:

```typescript
// Example of accessing the authenticated user in a protected procedure
const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
```

### Auth Configuration

The authentication system is configured in `src/auth/index.ts`:

```typescript
// src/auth/index.ts
import { BetterAuth } from "better-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";

export const auth = BetterAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    // Configure your auth providers here
  ],
  callbacks: {
    // Custom callbacks for auth events
  },
});
```

## 📝 Contributing

Please follow these guidelines when contributing to the backend package:

1. Create schema files for each logical entity in the system
2. Use Zod for input validation on all tRPC procedures
3. Write meaningful error messages and handle edge cases
4. Keep database migrations small and focused
5. Document new features and APIs

## 🔒 Security

Follow these security practices:

1. Never expose sensitive credentials in code or commit them to the repository
2. Always validate user input using Zod schemas
3. Use protected procedures for authenticated endpoints
4. Implement proper error handling to avoid exposing internal details

## 📄 License

This package is licensed under the proprietary Kin Technology Software License. See the [LICENSE](../../LICENSE) file for the complete terms and conditions. All rights reserved.

---

For technical support or questions, contact admin@kintechnology.io.
