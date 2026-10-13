import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { getUsers } from '@/lib/content';

const JWT_SECRET = process.env.JWT_SECRET || 'alwancatlog-secret-change-me';

export type AuthPayload = {
  id: string;
  username: string;
  role: string;
};

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

export async function authenticateUser(username: string, password: string) {
  const users = await getUsers();
  const user = users.find((item) => item.username.toLowerCase() === username.toLowerCase() && item.password === password);
  if (!user) return null;
  return { id: user.id, username: user.username, role: user.role, name: user.name };
}

export function getTokenFromRequest(request: NextRequest) {
  return request.cookies.get('alwancat_token')?.value || null;
}

export function isAuthenticatedRequest(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return false;
    verifyToken(token);
    return true;
  } catch {
    return false;
  }
}
