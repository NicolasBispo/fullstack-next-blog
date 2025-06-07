import { NextRequest, NextResponse } from "next/server";
import { getSession } from '@/lib/session'
import { prisma } from "@/core/prisma";
import { CurrentUserDto } from "@/responses/dto/current-user";

export async function GET(request: NextRequest){
  const session = await getSession()
  if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})
  const user = await prisma.user.findUnique({
    where: {
      id: session.id
    }
  })
  if(!user) return NextResponse.json({error: "User not found"}, {status: 404})
    
  return NextResponse.json(new CurrentUserDto({...user}))
}