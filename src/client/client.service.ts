import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client> {
    return this.prisma.client.findUniqueOrThrow({
      where: clientWhereUniqueInput,
    });
  }

  async clients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientWhereUniqueInput;
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }): Promise<Client[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    return this.prisma.client.create({
      data,
    });
  }

  async updateClient(id: string, updateData: Prisma.ClientUpdateInput) {
    return this.prisma.client.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async deleteClient(id: string) {
    return this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
