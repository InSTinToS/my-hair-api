import { Business as BusinessGQL, Location } from '@shared/graphql'
import { UserEntity } from '@src/modules/users/entities/user.entity'
import { IsOptional, Matches } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'

export class BusinessEntity implements BusinessGQL {
  @IsObjectId({ message: 'Invalid ID' })
  id?: string

  @IsOptional()
  @Matches(/^[a-z ]+$/i, { message: 'Invalid name' })
  name: string

  locations?: Location[]
  admins_ids?: UserEntity['id'][]
}
