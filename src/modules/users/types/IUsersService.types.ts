import { CreateUserDTO } from '@modules/users/dtos/create-user.dto'
import { DeleteUserDTO } from '@modules/users/dtos/delete-user.dto'
import { ReadUserDTO } from '@modules/users/dtos/read-user.dto'
import { UpdateUserDTO } from '@modules/users/dtos/update-user.dto'
import { UserEntity } from '@modules/users/entities/user.entity'

import { VerifyExistence } from './verifyExistence.types'

export interface IUsersService {
  verifyExistence: VerifyExistence
  readUsers: () => Promise<UserEntity[]>
  readUser: (dto: ReadUserDTO) => Promise<UserEntity>
  createUser: (dto: CreateUserDTO) => Promise<UserEntity>
  updateUser: (dto: UpdateUserDTO) => Promise<UserEntity>
  deleteUser: (dto: DeleteUserDTO) => Promise<UserEntity>
}
