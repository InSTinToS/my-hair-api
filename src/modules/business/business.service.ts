import { Injectable } from '@nestjs/common'
import { PrismaService } from '@src/shared/prisma/prisma.service'

import { ObjectID } from 'bson'
import { UserEntity } from '../users/entities/user.entity'
import { IBusinessService } from './types/IBusinessService.types'

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  createBusiness: IBusinessService['createBusiness'] = async dataToCreate => {
    const { locations } = dataToCreate

    const locationsWithId = locations.map(location => ({
      ...location,
      id: new ObjectID().toString()
    }))

    const createdBusiness = await this.prismaService.business.create({
      data: { ...dataToCreate, locations: locationsWithId }
    })

    const connectBusinessWithUser = async (adminId: UserEntity['id']) =>
      await this.prismaService.user.update({
        where: { id: adminId },
        data: { businesses: { connect: { id: createdBusiness.id } } }
      })

    createdBusiness.admins_ids.map(connectBusinessWithUser)

    return createdBusiness
  }

  readBusinesses: IBusinessService['readBusinesses'] = async dto => {
    const ids = dto?.ids

    if (ids) {
      const foundBusinesses = await this.prismaService.business.findMany({
        where: { id: { in: ids } }
      })

      return foundBusinesses
    }

    return this.prismaService.business.findMany()
  }

  readBusiness: IBusinessService['readBusiness'] = ({ id }) =>
    this.prismaService.business.findUnique({ where: { id } })

  updateBusiness: IBusinessService['updateBusiness'] = ({
    id,
    locations,
    ...dataToUpdate
  }) =>
    this.prismaService.business.update({
      where: { id },
      data: { ...dataToUpdate }
    })

  deleteBusiness: IBusinessService['deleteBusiness'] = ({ id }) =>
    this.prismaService.business.delete({ where: { id } })

  addLocations: IBusinessService['addLocations'] = ({
    businessId,
    locations
  }) => {
    const locationsWithId = locations?.map(location => ({
      ...location,
      id: new ObjectID().toString()
    }))

    return this.prismaService.business.update({
      where: { id: businessId },
      data: { locations: { push: locationsWithId } }
    })
  }

  deleteLocations: IBusinessService['deleteLocations'] = ({
    businessId,
    locationsIds
  }) =>
    this.prismaService.business.update({
      where: { id: businessId },
      data: {
        locations: { deleteMany: { where: { id: { in: locationsIds } } } }
      }
    })
}
