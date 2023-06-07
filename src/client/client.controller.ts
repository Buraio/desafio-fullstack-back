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
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { Client } from '@prisma/client';
import { UpdateClientDto } from './dto/updateClient.dto';
import { validate } from 'class-validator';
import { ClientEntity } from './entities/client.entity';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('/:id')
  async retrieveClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.client({ id: id });
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientData: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.updateClient(id, updateClientData);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
