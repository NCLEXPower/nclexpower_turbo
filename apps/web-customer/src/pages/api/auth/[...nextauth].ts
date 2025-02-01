import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from "core-library/config";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.value.GCID,
      clientSecret: config.value.GCS,
    }),
  ],
  secret: config.value.NXTAUTH,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email && session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
