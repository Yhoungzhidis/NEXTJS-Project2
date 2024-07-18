import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcrypt";

const handler = NextAuth({
    session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard",
  },
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        token.email = user.email;
        token.courseCode = user.courseCode;
      }
      return token;

    },
    async session({session, token}) {
      if(session.user) {
        session.user.email = token.email as string;
        session.user.courseCode = token.courseCode as string;
        session.user.courseName = token.courseName as string;
        session.user.courseDescription = token.courseDescription as string;
      }
      console.log(session);
      return session;
      
    }
  },
    providers: [
        Credentials({
          credentials: {
            email: {},
            courseCode:{},
          },
          authorize: async(credentials) => {
          //  console.log({credentials});
           const endpointer = `http://localhost:5050/student/add/course?email=${credentials?.email}`;
           const responses = axios.get(endpointer);
          console.log((await responses).data)

          if (responses) {
            return {
              id: (await responses).data.id,
              studentid: (await responses).data.studentid,
              email: (await responses).data.email,
              name: (await responses).data.name,
              courseCode: (await responses).data.courseCode,
              courseName: (await responses).data.courseName,
              courseDescription: (await responses).data.courseDescription,
            };
          }
          return null;
          },
        }),
      ],
});

export {handler as GET, handler as POST}; 


