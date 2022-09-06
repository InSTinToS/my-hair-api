import { DeleteUserInput } from '@shared/graphql'

import { UserEntity } from '@modules/users/entities/user.entity'

import { PickType } from '@nestjs/mapped-types'

export class DeleteUserDTO
  extends PickType(UserEntity, ['id'])
  implements DeleteUserInput {}
