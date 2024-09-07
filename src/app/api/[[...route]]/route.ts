import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

// routes
import userRoutes from "@/app/api/[[...route]]/user";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: process.env.SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");

const routes = app.route('/user', userRoutes);

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.use("*", initAuthConfig(getAuthConfig));

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);


export type AppType = typeof app;
