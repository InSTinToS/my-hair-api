import { Module } from '@nestjs/common'
import { BusinessService } from './business.service'
import { BusinessResolver } from './business.resolver'
import { PrismaService } from '@src/shared/prisma/prisma.service'

@Module({ providers: [BusinessResolver, BusinessService, PrismaService] })
export class BusinessModule {}
