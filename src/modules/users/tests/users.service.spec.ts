import { PrismaService } from '@shared/prisma/prisma.service'

import { CreateUserDTO } from '@modules/users/dtos/create-user.dto'
import { UsersService } from '@modules/users/users.service'

import { UsersMocks } from './mocks/users.mock'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('UsersService', () => {
  let service: UsersService

  const mockedPrisma = {
    user: {
      delete: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService]
    })
      .overrideProvider(PrismaService)
      .useValue(mockedPrisma)
      .compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('when verify if user exists', () => {
    it('should be able to verify if user exists', async () => {
      const user = UsersMocks.getValidUser()

      mockedPrisma.user.findUnique.mockReturnValue(user)

      const { foundUser } = await service.verifyExistence({ id: user.id })

      expect(foundUser).toStrictEqual(user)
    })

    it('should be able to verify if user exists with more than one key', async () => {
      const user = UsersMocks.getValidUser()

      mockedPrisma.user.findUnique
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(user)

      const exists = await service.verifyExistence({
        id: 'invalidId',
        email: user.email
      })

      expect(exists).toStrictEqual({ foundUser: user, by: 'email' })
    })

    it('should return undefined if user not exists', async () => {
      const user = UsersMocks.getValidUser()

      mockedPrisma.user.findUnique.mockReturnValue(undefined)

      const { foundUser } = await service.verifyExistence({ id: user.id })

      expect(foundUser).toBe(undefined)
    })
  })

  describe('when list all users', () => {
    it('should be able to list all users', async () => {
      const mockedUsers = UsersMocks.getValidUsers(3)
      mockedPrisma.user.findMany.mockReturnValue(mockedUsers)

      const foundUsers = await service.readUsers()

      expect(foundUsers).toStrictEqual(mockedUsers)
      expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })
  })

  describe('when search user', () => {
    it('should be able to find user using id', async () => {
      const mockedUser = UsersMocks.getValidUser()

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: mockedUser, by: 'id' })

      const foundUser = await service.readUser({ id: mockedUser.id })

      expect(foundUser).toStrictEqual(mockedUser)
      expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should be able to find user using username', async () => {
      const mockedUser = UsersMocks.getValidUser()

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: mockedUser, by: 'id' })

      const foundUser = await service.readUser({
        username: mockedUser.username
      })

      expect(foundUser).toStrictEqual(mockedUser)
      expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should be able to find user using email', async () => {
      const mockedUser = UsersMocks.getValidUser()

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: mockedUser, by: 'id' })

      const foundUser = await service.readUser({ email: mockedUser.email })

      expect(foundUser).toStrictEqual(mockedUser)
      expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should return exception when user not found', async () => {
      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: undefined, by: undefined })

      try {
        await service.readUser({ id: UsersMocks.getValidUser().id })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)

        if (error instanceof NotFoundException)
          expect(error.message).toBe('User not found')
      }

      expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1)
    })
  })

  describe('when create user', () => {
    it('should be able to create a user', async () => {
      mockedPrisma.user.create.mockReturnValue(UsersMocks.getValidUser())

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: undefined, by: undefined })

      const createDTO = UsersMocks.getValidCreateUserDTO()
      const { email, username } = createDTO
      const createdUser = await service.createUser(createDTO)

      expect(createdUser).toMatchObject({ email, username })
      expect(mockedPrisma.user.create).toHaveBeenCalledTimes(1)
    })

    it('should return exception when username already exists', async () => {
      const user2 = UsersMocks.getValidUser(2)

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: user2, by: 'username' })

      const user = UsersMocks.getValidUser()

      const createDTO: CreateUserDTO = {
        username: user.username,
        password: user.password,
        email: 'new' + user.email
      }

      try {
        const notCreatedUser = await service.createUser(createDTO)

        expect(notCreatedUser).not.toMatchObject(user)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)

        if (error instanceof BadRequestException)
          expect(error.message).toBe('username already exists')
      }
    })

    it('should return exception when email already exists', async () => {
      const user2 = UsersMocks.getValidUser(2)

      jest
        .spyOn(service, 'verifyExistence')
        .mockResolvedValue({ foundUser: user2, by: 'email' })

      const user = UsersMocks.getValidUser()
      const createDTO: CreateUserDTO = {
        email: user.email,
        password: user.password,
        username: 'new' + user.username
      }

      try {
        const notCreatedUser = await service.createUser(createDTO)

        expect(notCreatedUser).not.toMatchObject(user)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)

        if (error instanceof BadRequestException)
          expect(error.message).toBe('email already exists')
      }
    })
  })

  describe('when update user', () => {
    it('should be able to update a user', async () => {
      const user = UsersMocks.getValidUser()
      const newFullName = 'newFullName'

      mockedPrisma.user.findUnique.mockReturnValue(user)
      mockedPrisma.user.update.mockReturnValue({
        ...user,
        full_name: newFullName
      })

      const updatedUser = await service.updateUser({
        id: user.id,
        full_name: newFullName
      })

      expect(updatedUser.full_name === newFullName).toBe(true)
    })

    it('should not be able to update if user not found', () => {
      mockedPrisma.user.findUnique.mockReturnValue(undefined)

      expect(
        service.updateUser({ id: 'invalidId', full_name: 'newFullName' })
      ).rejects.toBeInstanceOf(NotFoundException)
    })

    it('should not be able to update email if already exists', () => {
      const user = UsersMocks.getValidUser()
      const user2 = UsersMocks.getValidUser(2)

      mockedPrisma.user.findUnique
        .mockReturnValueOnce(user)
        .mockReturnValueOnce(user2)

      expect(
        service.updateUser({ email: user2.email, id: user.id })
      ).rejects.toBeInstanceOf(BadRequestException)
    })

    it('should not be able to update username if already exists', () => {
      const user = UsersMocks.getValidUser()
      const user2 = UsersMocks.getValidUser(2)

      mockedPrisma.user.findUnique
        .mockReturnValueOnce(user)
        .mockReturnValueOnce(user2)

      expect(
        service.updateUser({ username: user2.username, id: user.id })
      ).rejects.toBeInstanceOf(BadRequestException)
    })
  })

  describe('when delete user', () => {
    it('should be able to delete a user', async () => {
      const user = UsersMocks.getValidUser()

      mockedPrisma.user.findUnique.mockReturnValue(user)
      mockedPrisma.user.delete.mockReturnValue(user)

      const deletedUser = await service.deleteUser({ id: user.id })

      expect(deletedUser).toStrictEqual(user)
    })

    it('should not be able to delete a user if not exists', async () => {
      mockedPrisma.user.findUnique.mockReturnValue(undefined)

      expect(service.deleteUser({ id: 'invalidId' })).rejects.toBeInstanceOf(
        NotFoundException
      )
    })
  })
})
