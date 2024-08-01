import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum AccountType {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  @IsEnum(AccountType)
  accountType: AccountType;
}
