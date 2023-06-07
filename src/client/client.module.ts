import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PrismaService } from 'src/prisma.service';
import { ContactModule } from 'src/contact/contact.module';
import { ContactService } from 'src/contact/contact.service';

@Module({
  imports: [ContactModule],
  controllers: [ClientController],
  providers: [ClientService, ContactService, PrismaService],
})
export class ClientModule {}
