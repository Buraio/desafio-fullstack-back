import { Prisma } from '@prisma/client';

export class CreateContactDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  clientId: string;
  client: Prisma.ClientCreateNestedOneWithoutContactsInput;
}
