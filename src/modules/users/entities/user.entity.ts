import { User as UserGQL } from '@shared/graphql'
import {
  IsAlphanumeric,
  IsBase64,
  IsDateString,
  IsEmail,
  IsOptional,
  Matches
} from 'class-validator'

import { IsObjectId } from 'class-validator-mongo-object-id'

export class UserEntity implements UserGQL {
  @IsObjectId({ message: 'Invalid ID' })
  id: string

  @IsEmail({}, { message: 'Invalid e-mail' })
  email: string

  @IsAlphanumeric(undefined, { message: 'Username needs to be alphanumeric' })
  username: string

  // @IsJWT
  password: string

  @IsDateString()
  updated_at: any

  @IsDateString()
  created_at: any

  @IsBase64()
  @IsOptional()
  avatar?: any

  @IsOptional()
  @Matches(/^[a-z ]+$/i, { message: 'Invalid full_name' })
  full_name?: string
}
