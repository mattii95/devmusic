import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { addHoursDate } from "./lib/utils/addHoursDate";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Spotify({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read',
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expireToken = addHoursDate(Date.now(), 1)
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken as string,
                    refreshToken: token.refreshToken as string,
                    expireToken: token.expireToken as Date
                }
            }
        },
    }
});