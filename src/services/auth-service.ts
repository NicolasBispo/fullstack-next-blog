import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { prisma } from "@/core/prisma";
import { compare, hash } from "bcrypt";

export default class AuthService {
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

  static async register(payload: RegisterSchema) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await hash(payload.password, 10);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
} 