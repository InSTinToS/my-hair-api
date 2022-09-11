import { AddLocationsInput } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class AddLocationsDTO implements AddLocationsInput {
  businessId: BusinessEntity['id']
  locations: BusinessEntity['locations']
}
