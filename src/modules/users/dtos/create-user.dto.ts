import { CreateUserInput } from '@shared/graphql'

import { UserEntity } from '@modules/users/entities/user.entity'

import { PickType } from '@nestjs/mapped-types'

export class CreateUserDTO
  extends PickType(UserEntity, ['username', 'email', 'password'])
  implements CreateUserInput {}
