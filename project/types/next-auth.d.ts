
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            email: string;
            id: string;
            name: string;
            courseCode: string;
            courseName: string;
            courseDescription: string;
        };
    }
    
    interface User {
        courseCode: string;
        courseName: string;
        courseDescription: string;
    }

}