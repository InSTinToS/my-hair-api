import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { PrismaService } from '@shared/prisma/prisma.service'
import { IUsersService } from './types/IUsersService.types'
import { VerifyExistenceReturn } from './types/verifyExistence.types'

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly prismaService: PrismaService) {}

  verifyExistence: IUsersService['verifyExistence'] = async data => {
    let by: VerifyExistenceReturn['by']
    let foundUser: VerifyExistenceReturn['foundUser']
    const keys = Object.keys(data) as VerifyExistenceReturn['by'][]

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = data[key]

      if (!foundUser && value) {
        foundUser = await this.prismaService.user.findUnique({
          where: { [key]: value }
        })

        by = key
      }
    }

    return { foundUser, by }
  }

  readUsers: IUsersService['readUsers'] = async () => {
    return this.prismaService.user.findMany()
  }

  readUser: IUsersService['readUser'] = async ({ id, email, username }) => {
    const { foundUser } = await this.verifyExistence({ id, email, username })

    if (!foundUser) throw new NotFoundException('User not found')

    return foundUser
  }

  createUser: IUsersService['createUser'] = async ({
    email,
    password,
    username
  }) => {
    const { foundUser, by } = await this.verifyExistence({ email, username })

    if (foundUser) throw new BadRequestException(`${by} already exists`)

    return this.prismaService.user.create({
      data: { email, password, username }
    })
  }

  updateUser: IUsersService['updateUser'] = async dto => {
    const id = dto.id
    const { email, username } = dto

    await this.readUser({ id })

    const alreadyExists = await this.verifyExistence({ email, username })

    if (alreadyExists.foundUser)
      throw new BadRequestException(`${alreadyExists.by} already exists`)

    delete dto.id

    return this.prismaService.user.update({
      where: { id },
      data: dto
    })
  }

  deleteUser: IUsersService['deleteUser'] = async ({ id }) => {
    const { foundUser } = await this.verifyExistence({ id })

    if (!foundUser) throw new NotFoundException('User not found')

    return this.prismaService.user.delete({ where: { id: id } })
  }
}
