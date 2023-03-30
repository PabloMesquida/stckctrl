import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { findOne } from "@/helpers/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error(
            "¡Ups! Parece que falta la información necesaria para continuar."
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error(
            "Parece que el formato del correo electrónico no es válido."
          );
        }

        if (password.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        const user = await findOne("usertbl", {
          column: "email",
          value: email,
        });

        if (!user) {
          throw new Error("No se encontró al usuario.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("La contraseña no coincide.");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
