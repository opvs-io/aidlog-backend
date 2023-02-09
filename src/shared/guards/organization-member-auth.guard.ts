import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class OrganizationMemberAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.user || !request.user.memberOrganizationId) {
        return false;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
