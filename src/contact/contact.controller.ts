import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Contact } from '@prisma/client';
import { CreateContactDto } from './dto/createContact.dto';
import { ContactService } from './contact.service';
import { UpdateContactDto } from './dto/updateContact.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createContact(
    @Body() contactData: CreateContactDto,
    @Request() request,
  ) {
    const userId = request.user.sub;

    return this.contactService.createContact(userId, contactData);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async retrieveAllContacts(@Request() request): Promise<Contact[]> {
    console.log(request);

    return this.contactService.contacts({
      where: {
        clientId: request.user.sub,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async retrieveContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.contact({ id: id });
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactData: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactService.updateContact(id, updateContactData);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.deleteContact(id);
  }
}
