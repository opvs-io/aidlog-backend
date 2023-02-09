import jwt from 'jsonwebtoken';

export interface SupabaseAuthPayload extends jwt.JwtPayload {
  sub: string;
}
