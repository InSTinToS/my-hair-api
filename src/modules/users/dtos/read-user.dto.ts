import { ReadUserInput } from '@shared/graphql'

import { UserEntity } from '@modules/users/entities/user.entity'

import { PartialType, PickType } from '@nestjs/mapped-types'

export class ReadUserDTO
  extends PickType(PartialType(UserEntity), ['id', 'username', 'email'])
  implements ReadUserInput {}
