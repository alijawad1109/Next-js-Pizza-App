import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./../../../models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../libs/MongoConnect";
import { UserInfo } from "@/app/models/UserInfo";
export const authOptions = {
  secret: "Admin1101",
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(
          "mongodb+srv://AJStyle:Admin1101@cluster0.lucezsz.mongodb.net/Food-order"
        );
        const user = await User.findOne({ email });
        const passwordOk = user.password;
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export async function isAdmin(){
   const session = await getServerSession(authOptions);
   const userEmail=session?.user?.email
   if(!userEmail){
    return false
   }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if(!userInfo){
    return false;
  }
  return userInfo?.admin
}
export { handler as GET, handler as POST };
