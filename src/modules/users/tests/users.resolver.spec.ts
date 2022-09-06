import { UsersResolver } from '../users.resolver'
import { UsersService } from '../users.service'
import { UsersMocks } from './mocks/users.mock'
import { Test, TestingModule } from '@nestjs/testing'

describe('UsersResolver', () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(UsersMocks.service)
      .compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should be able to list all users', async () => {
    const mockedUsers = UsersMocks.getValidUsers(3)
    UsersMocks.service.readUsers.mockResolvedValue(mockedUsers)

    const users = await resolver.readUsers()

    expect(users).toStrictEqual(mockedUsers)
  })

  it('should be able to find user by id', async () => {
    const mockedUser = UsersMocks.getValidUser()

    UsersMocks.service.readUser.mockResolvedValue(mockedUser)

    const user = await resolver.readUser({ id: mockedUser.id })

    expect(user).toStrictEqual(mockedUser)
  })

  it('should be able to create a user', async () => {
    const mockedUser = UsersMocks.getValidUser()

    UsersMocks.service.createUser.mockResolvedValue(mockedUser)

    const user = await resolver.createUser(UsersMocks.getValidCreateUserDTO())

    expect(user).toStrictEqual(mockedUser)
  })

  it('should be able to update a user', async () => {
    const mockedUser = UsersMocks.getValidUser()

    const newFullName = 'newFullName'

    UsersMocks.service.updateUser.mockResolvedValue({
      ...mockedUser,
      full_name: newFullName
    })

    const user = await resolver.updateUser({
      id: mockedUser.id,
      full_name: newFullName
    })

    expect(user.full_name).toStrictEqual(newFullName)
  })

  it('should be able to delete a user', async () => {
    const mockedUser = UsersMocks.getValidUser()

    UsersMocks.service.deleteUser.mockResolvedValue(mockedUser)

    const user = await resolver.deleteUser({ id: mockedUser.id })

    expect(user).toStrictEqual(mockedUser)
  })
})
