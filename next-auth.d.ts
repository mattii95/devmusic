import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
    accessToken: string
    refreshToken: string
    expireToken: Date
}

// declare module "next-auth" {
//     interface User {
//         id: string
//         email: string
//         accessToken: string
//     }

//     interface Session {
//         user: User & DefaultSession["user"]
//         expires: string
//         error: string
//     }
// }

declare module "next-auth" {
    interface User extends IUser { }

    interface Session {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser {}
}