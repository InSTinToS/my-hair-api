import { Global, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { UsersModule } from '@modules/users/users.module'
import { PrismaService } from '@shared/prisma/prisma.service'
import { BusinessModule } from '@modules/business/business.module'

@Global()
@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [
    UsersModule,
    BusinessModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      playground: false,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ]
})
export class AppModule {}
