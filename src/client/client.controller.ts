import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { Client, Contact } from '@prisma/client';
import { UpdateClientDto } from './dto/updateClient.dto';
import { ContactService } from 'src/contact/contact.service';
import { validate } from 'class-validator';
import { ClientEntity } from './entities/client.entity';

@Controller('/clients')
export class ClientController {
  constructor(
    private clientService: ClientService,
    private contactService: ContactService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async createClient(
    @Body() clientData: CreateClientDto,
  ): Promise<ClientEntity> {
    const errors = await validate(clientData);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const createdClient = await this.clientService.createClient(clientData);

    return new ClientEntity(createdClient);
  }

  @Get('/:id')
  async retrieveClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.client({ id: id });
  }

  @Get('/:id/contacts')
  async retrieveAllContacts(@Param('id') id: string): Promise<Contact[]> {
    return this.contactService.contacts({
      where: {
        clientId: id,
      },
    });
  }

  @Patch('/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientData: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.updateClient(id, updateClientData);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
