import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ImagesModule],
})
export class AppModule {}
