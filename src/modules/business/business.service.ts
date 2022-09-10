import { Injectable } from '@nestjs/common'
import { PrismaService } from '@src/shared/prisma/prisma.service'
import { CreateBusinessDTO } from './dto/create-business.dto'

import { UpdateBusinessDTO } from './dto/update-business.dto'
import { ObjectID } from 'bson'

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dataToCreate: CreateBusinessDTO) {
    const locationsWithId = dataToCreate.locations.map(data => ({
      ...data,
      id: new ObjectID().toString()
    }))

    const createdBusiness = await this.prismaService.business.create({
      data: { ...dataToCreate, locations: locationsWithId }
    })

    createdBusiness.admins_ids.map(
      async adminId =>
        await this.prismaService.user.update({
          where: { id: adminId },
          data: { businesses: { connect: { id: createdBusiness.id } } }
        })
    )

    return createdBusiness
  }

  findUserBusinesses(businessesIds: string[]) {
    return businessesIds.map(id =>
      this.prismaService.business.findUnique({ where: { id } })
    )
  }

  readBusinesses() {
    return this.prismaService.business.findMany()
  }

  readBusiness(id: string) {
    return this.prismaService.business.findUnique({ where: { id } })
  }

  update(id: string, updateData: UpdateBusinessDTO) {
    return this.prismaService.business.update({
      where: { id },
      data: updateData
    })
  }

  remove(id: string) {
    return this.prismaService.business.delete({ where: { id } })
  }
}
