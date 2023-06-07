import { Exclude } from 'class-transformer';

export class ClientEntity {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }
}
