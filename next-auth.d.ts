import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            role: string;
            id: string;
        };
    }

    interface User {
        role: string;
    }
}
