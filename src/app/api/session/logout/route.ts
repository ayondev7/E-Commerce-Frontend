import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });

  res.cookies.set('authToken', '', {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: '/',
  });

  res.cookies.set('userType', '', {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: '/',
  });

  return res;
}
