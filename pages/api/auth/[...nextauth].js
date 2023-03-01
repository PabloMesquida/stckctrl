import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "@/config/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        executeQuery().catch((error) => {
          error: "Connection failed.";
        });

        const user = await executeQuery({
          query: `SELECT * FROM usertbl WHERE email = "${credentials.email}"`,
          value: [],
        });

        if (!user) throw new Error("No user found.");
        const checkPassword = await bcrypt.compare(
          credentials.password,
          user[0].password
        );

        if (!checkPassword || user[0].email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return user[0];
      },
    }),
  ],
});
