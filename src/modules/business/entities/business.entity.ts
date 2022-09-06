import { Business as BusinessGQL, User } from '@shared/graphql'
import { IsOptional, Matches } from 'class-validator'

import { IsObjectId } from 'class-validator-mongo-object-id'

export class BusinessEntity implements BusinessGQL {
  @IsObjectId({ message: 'Invalid ID' })
  id?: string

  @IsOptional()
  @Matches(/^[a-z ]+$/i, { message: 'Invalid name' })
  name: string

  admins?: User[]
}
