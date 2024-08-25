
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
import next from "next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };