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
import { Contact } from '@prisma/client';
import { CreateContactDto } from './dto/createContact.dto';
import { ContactService } from './contact.service';
import { UpdateContactDto } from './dto/updateContact.dto';

@Controller('/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/')
  async createContact(@Body() contactData: CreateContactDto) {
    return this.contactService.createContact(contactData);
  }

  @Get('/:id')
  async retrieveContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.contact({ id: id });
  }

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
