import { LoginSchema } from "@/schemas/auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth-service";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LoginSchema;
    const user = await AuthService.login(body);
    await createSession(user.id)
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
