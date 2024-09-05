import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
