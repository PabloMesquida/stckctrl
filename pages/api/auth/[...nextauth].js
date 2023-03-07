import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "@/config/db";
import { findOne } from "@/helpers/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          // Validar que el correo electrónico y la contraseña estén presentes
          if (!email || !password) {
            throw new Error("Missing credentials.");
          }

          // Validar que el correo electrónico tenga un formato válido
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
          }

          // Validar que la contraseña tenga al menos 6 caracteres
          if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
          }

          const user = await findOne("usertbl", {
            column: "email",
            value: email,
          });

          if (!user) {
            throw new Error("User not found.");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Password doesn't match");
          }

          return user;
        } catch (error) {
          throw new Error("Connection failed.");
        }
      },
    }),
  ],
});

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       async authorize(credentials, req) {
//         executeQuery().catch((error) => {
//           error: "Connection failed.";
//         });

//         const user = await executeQuery({
//           query: `SELECT * FROM usertbl WHERE email = "${credentials.email}"`,
//           value: [],
//         });

//         if (!user) throw new Error("No user found.");
//         const checkPassword = await bcrypt.compare(
//           credentials.password,
//           user[0].password
//         );

//         if (!checkPassword || user[0].email !== credentials.email) {
//           throw new Error("Username or Password doesn't match");
//         }

//         return user[0];
//       },
//     }),
//   ],
// });
