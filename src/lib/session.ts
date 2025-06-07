import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { env } from "@/core/environment";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(env.auth.session_secret);

type SessionPayload = {
  id: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as SessionPayload;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid token");
  }
}

export async function createSession(userId: string) {
  const session = await encrypt({ id: userId });
  const cookiesStore = await cookies();

  cookiesStore.set("session", session, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  if(!session) return null
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value
  if(!session) return null
  const payload = await decrypt(session)
  return payload as SessionPayload
}