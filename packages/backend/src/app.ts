import env from "@/env";
import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { router } from "./lib/router";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: env.CLIENT_ORIGIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
const healthcheck = {
  status: "ok",
  timestamp: new Date().toISOString(),
};
app.get("/", c => c.json(healthcheck));
app.get("/healthcheck", c => c.json(healthcheck));

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/session", async (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user) {
    return c.body(null, 401);
  }

  return c.json({
    session,
    user,
  });
});

app.use(
  "/trpc/*",
  trpcServer({
    router,
  }),
);

serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT),
  },
  (info) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
