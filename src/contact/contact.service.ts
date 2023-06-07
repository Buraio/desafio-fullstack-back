import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Contact, Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async contact(
    contactWhereUniqueInput: Prisma.ContactWhereUniqueInput,
  ): Promise<Contact> {
    return this.prisma.contact.findUniqueOrThrow({
      where: contactWhereUniqueInput,
      include: {
        client: true,
      },
    });
  }

  async contacts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }): Promise<Contact[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.contact.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createContact(
    userId: string,
    data: Prisma.ContactCreateInput,
  ): Promise<Contact> {
    const contact = await this.prisma.contact.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        clientId: userId,
      },
      include: {
        client: true,
      },
    });

    return contact;
  }

  async updateContact(id: string, updateData: Prisma.ContactUpdateInput) {
    return this.prisma.contact.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async deleteContact(id: string) {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}
