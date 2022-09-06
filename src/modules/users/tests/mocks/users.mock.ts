import { CreateUserDTO } from '@modules/users/dtos/create-user.dto'
import { UserEntity } from '@modules/users/entities/user.entity'
import { IUsersService } from '@modules/users/types/IUsersService.types'

import { ObjectId } from 'mongodb'

type TMockedService = { [key in keyof IUsersService]: jest.Mock<any, any> }

export class UsersMocks {
  static service: TMockedService = {
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    readUser: jest.fn(),
    readUsers: jest.fn(),
    updateUser: jest.fn(),
    verifyExistence: jest.fn()
  }

  static getValidUser(id = 1) {
    const validUser: UserEntity = {
      avatar: 'base64Avatar',
      full_name: 'Valid FullName',
      password: 'ValidPassword@1234',
      email: `valid${id}@email.com`,
      username: `ValidUsername${id}`,
      id: new ObjectId(id).toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    return validUser
  }

  static getValidUsers(quantity: number, fromId = 1) {
    const users: UserEntity[] = []

    for (let i = fromId; i < fromId + quantity; i++)
      users.push(this.getValidUser(i))

    return users
  }

  static getValidCreateUserDTO(id = 1) {
    const createUserDTO: CreateUserDTO = {
      password: 'ValidPassword@1234',
      email: `valid${id}@email.com`,
      username: `ValidUsername${id}`
    }

    return createUserDTO
  }
}
