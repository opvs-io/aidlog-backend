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

import { UsersService } from '@aidlog/users/users.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const payload = jwt.verify(
        token,
        supabaseConfig.jwtSecret,
      ) as SupabaseAuthPayload;

      const user = await this.usersService.findOneByUid(payload.sub);

      if (!user) {
        return false;
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
