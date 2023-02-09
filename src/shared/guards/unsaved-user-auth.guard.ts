import jwt from 'jsonwebtoken';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

import supabaseConfig from '@aidlog/shared/configs/supabase.config';

import { SupabaseAuthPayload } from '@aidlog/shared/interfaces/supabase-auth-payload.interface';

@Injectable()
export class UnsavedUserAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const payload = jwt.verify(
        token,
        supabaseConfig.jwtSecret,
      ) as SupabaseAuthPayload;

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
