"use server"
import { LoginSchema } from "@/schemas/auth";
import { prisma } from "@/core/prisma";
import { compare } from "bcrypt";

export class AuthService {
  static async login(payload: LoginSchema) {
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
} 