import { CacheModule, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { RecordsModule } from '@aidlog/records/records.module';
import { RequestsModule } from '@aidlog/requests/requests.module';
import { UsersModule } from '@aidlog/users/users.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000, // in ms, 1 min
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // in secs
      limit: 100,
    }),
    RecordsModule,
    RequestsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
