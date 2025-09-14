import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, userType, guest } = body;

  const endpoint = guest
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${userType}s/guest-login`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${userType}s/login`;

  const backendRes = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guest ? {} : { email, password }),
  });

  if (!backendRes.ok) {
    const error = await backendRes.json();
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const { accessToken, ...user } = await backendRes.json();

  const res = NextResponse.json({ accessToken, user });

  res.cookies.set('authToken', accessToken, {
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 3, 
    path: '/',
  });

  res.cookies.set('userType', userType, {
    httpOnly: false,
    secure: true,
    maxAge: 60 * 60 * 3,
    path: '/',
  });

  return res;
}
