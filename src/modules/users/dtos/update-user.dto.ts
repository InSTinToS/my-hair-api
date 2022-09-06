import { UpdateUserInput } from '@shared/graphql'

import { UserEntity } from '@modules/users/entities/user.entity'

import { OmitType, PartialType } from '@nestjs/mapped-types'

export class UpdateUserDTO
  extends PartialType(OmitType(UserEntity, ['created_at', 'updated_at', 'id']))
  implements UpdateUserInput
{
  id: UserEntity['id']
}
