import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "supersecretisnextjsauthisnotcool",
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}