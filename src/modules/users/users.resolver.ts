import { CreateUserDTO } from './dtos/create-user.dto'
import { DeleteUserDTO } from './dtos/delete-user.dto'
import { ReadUserDTO } from './dtos/read-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { UsersService } from './users.service'

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  readUsers() {
    return this.usersService.readUsers()
  }

  @Query('user')
  readUser(@Args('readUserInput') readUserDTO: ReadUserDTO) {
    return this.usersService.readUser(readUserDTO)
  }

  @Mutation('createUser')
  createUser(@Args('createUserInput') createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO)
  }

  @Mutation('updateUser')
  updateUser(@Args('updateUserInput') updateUserDTO: UpdateUserDTO) {
    return this.usersService.updateUser(updateUserDTO)
  }

  @Mutation('deleteUser')
  deleteUser(@Args('deleteUserInput') deleteUserDTO: DeleteUserDTO) {
    return this.usersService.deleteUser(deleteUserDTO)
  }
}
