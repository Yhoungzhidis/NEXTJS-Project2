import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcrypt";

const handler = NextAuth({
      session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
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
        session.user.name = token.name as string;
        // session.user.courseCode = token.courseCode as string;
        
      }
      console.log(session);
      return session;
      
    }
  },
    providers: [
        Credentials({
          credentials: {
            email: {},
            password: {},
            endpoint: {},
          },
          authorize: async(credentials) => {
            
          //  console.log({credentials});
           const endpoint = `http://localhost:5050/student?email=${credentials?.email}`;

           const response = axios.get(endpoint);
           console.log(response);
           const rawPassword = (await credentials?.password) || "";
           const match = await bcrypt.compare(
            rawPassword,
            (
              await response
            ).data.password
          );
          console.log((await response).data.password);
          console.log((await response).data)
          console.log(rawPassword);
          console.log({ match });
          if (match) {
            return {
              id: (await response).data.id,
              studentid: (await response).data.studentid,
              email: (await response).data.email,
              name: (await response).data.name,
              courseCode: (await response).data.courseCode,
              courseName: (await response).data.courseName,
              courseDescription: (await response).data.courseDescription,
            };
          }
          return null;
          },
        }),
      ],
});

export {handler as GET, handler as POST}; 


