import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientModule, ContactModule, AuthModule],
})
export class AppModule {}
