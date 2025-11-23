import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  readonly _id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Exclude()
  readonly password: string;
}
