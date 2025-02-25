import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access_token: string;
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}

async function refreshAccessToken(token: JWT) {
  if (!token.refresh_token) throw new TypeError("Missing refresh_token");

  const response = await fetch("http://localhost:8080/realms/onezip/protocol/openid-connect/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.AUTH_GOOGLE_ID!,
      client_secret: process.env.AUTH_GOOGLE_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
  });

  const refreshedTokens = await response.json();

  if (!response.ok) throw refreshedTokens;

  return {
    ...token,
    access_token: refreshedTokens.access_token,
    expires_at: refreshedTokens.expires_in,
    refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    refresh_expires_in: refreshedTokens.refresh_expires_in,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      account(account) {
        return {
          ...account,
          access_token: account.access_token,
          expires_at: account.expires_in,
          refresh_token: account.refresh_token,
          refresh_expires_at: account.refresh_expires_in,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, account, user }) {
      console.log(token);

      if (account) {
        token.access_token = account.access_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;
        token.refresh_expires_at = account.refresh_expires_at!;
        return token;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          return await refreshAccessToken(token);
        } catch (error) {
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      session.access_token = token.access_token;
      return session;
    },
  },
});
