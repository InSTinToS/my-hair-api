import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BusinessService } from './business.service'
import { AddLocationsDTO } from './dto/addLocations.dto'
import { CreateBusinessDTO } from './dto/createBusiness.dto'
import { DeleteBusinessDTO } from './dto/deleteBusiness.dto'
import { DeleteLocationsDTO } from './dto/deleteLocations.dto'
import { ReadBusinessDTO } from './dto/readBusiness.dto'
import { ReadBusinessesDTO } from './dto/readBusinesses.dto'
import { UpdateBusinessDTO } from './dto/updateBusiness.dto'

@Resolver('Business')
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  @Query('businesses')
  readBusinesses(
    @Args('readBusinessInput') readBusinessDTO: ReadBusinessesDTO
  ) {
    return this.businessService.readBusinesses(readBusinessDTO)
  }

  @Query('business')
  readBusiness(@Args('readBusinessInput') readBusinessDTO: ReadBusinessDTO) {
    return this.businessService.readBusiness(readBusinessDTO)
  }

  @Mutation('createBusiness')
  createBusiness(
    @Args('createBusinessInput') createBusinessDTO: CreateBusinessDTO
  ) {
    return this.businessService.createBusiness(createBusinessDTO)
  }

  @Mutation('updateBusiness')
  updateBusiness(
    @Args('updateBusinessInput') updateBusinessDTO: UpdateBusinessDTO
  ) {
    return this.businessService.updateBusiness(updateBusinessDTO)
  }

  @Mutation('deleteBusiness')
  deleteBusiness(
    @Args('deleteBusinessInput') deleteBusinessDTO: DeleteBusinessDTO
  ) {
    return this.businessService.deleteBusiness(deleteBusinessDTO)
  }

  @Mutation('addLocations')
  addLocations(@Args('addLocationsInput') addLocationsDTO: AddLocationsDTO) {
    return this.businessService.addLocations(addLocationsDTO)
  }

  @Mutation('deleteLocations')
  deleteLocations(
    @Args('deleteLocationsInput') deleteLocationsDTO: DeleteLocationsDTO
  ) {
    return this.businessService.deleteLocations(deleteLocationsDTO)
  }
}
