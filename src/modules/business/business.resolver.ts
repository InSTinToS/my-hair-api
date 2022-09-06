import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BusinessService } from './business.service'
import { CreateBusinessDTO } from './dto/create-business.dto'
import { UpdateBusinessDTO } from './dto/update-business.dto'

@Resolver('Business')
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  @Query('business')
  findAll() {
    return this.businessService.readBusinesses()
  }

  @Query('business')
  findOne(@Args('id') id: string) {
    return this.businessService.readBusiness(id)
  }

  @Mutation('createBusiness')
  create(@Args('createBusinessInput') createBusinessInput: CreateBusinessDTO) {
    this.businessService.create(createBusinessInput)
  }

  @Mutation('updateBusiness')
  update(@Args('updateBusinessInput') updateBusinessInput: UpdateBusinessDTO) {}

  @Mutation('removeBusiness')
  remove(@Args('id') id: number) {
    return this.businessService.remove(id)
  }
}
