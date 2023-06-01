import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { Client } from '@prisma/client';
import { updateClientDto } from './dto/updateClient.dto';

@Controller('/clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('/')
  async createClient(@Body() clientData: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(clientData);
  }

  @Get('/:id')
  async retrieveClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.client({ id: id });
  }

  @Patch('/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientData: updateClientDto,
  ): Promise<Client> {
    return this.clientService.updateClient(id, updateClientData);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
