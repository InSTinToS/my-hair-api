import { Injectable } from '@nestjs/common'
import { PrismaService } from '@src/shared/prisma/prisma.service'
import { CreateBusinessDTO } from './dto/create-business.dto'
import { UpdateBusinessDTO } from './dto/update-business.dto'

@Injectable()
export class BusinessService {
  constructor(private readonly prismaService: PrismaService) {}

  create(dataToCreate: CreateBusinessDTO) {
    return this.prismaService.business.create({ data: dataToCreate })
  }

  readBusinesses() {
    return this.prismaService.user.findMany()
  }

  readBusiness(id: string) {
    return this.prismaService.business.findUnique({ where: { id } })
  }

  update(id: number, updateBusinessDTO: UpdateBusinessDTO) {
    return `This action updates a #${id} business`
  }

  remove(id: number) {
    return `This action removes a #${id} business`
  }
}
