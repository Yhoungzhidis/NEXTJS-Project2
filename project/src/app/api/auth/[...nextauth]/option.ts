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

      }
      return token;

    },
    async session({session, token}) {
      if(session.user) {
        session.user.email = token.email as string;
        session.user.image = token.courseCode as string;
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
           const endpoint = `http://localhost:5050/student/add/course?email=${credentials?.email}`;
           const response = axios.get(endpoint);
          console.log((await response).data)

          return null;
          },
        }),
      ],
});

export {handler as GET, handler as POST}; 


