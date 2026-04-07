import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set');
const SECRET: string = JWT_SECRET;

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

// ── Token creation ─────────────────────────────
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

// ── Token verification ─────────────────────────
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// ── Extract token from request ─────────────────
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookie = request.cookies.get('ccaskesa_token');
  return cookie?.value || null;
}

// ── Password helpers ───────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── Auth guard for API routes ──────────────────
export function getUserFromRequest(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export function requireAuth(request: NextRequest): JwtPayload {
  const user = getUserFromRequest(request);
  if (!user) throw new Error('Unauthorized');
  return user;
}

export function requireAdmin(request: NextRequest): JwtPayload {
  const user = requireAuth(request);
  if (user.role !== 'ADMIN') throw new Error('Forbidden');
  return user;
}
