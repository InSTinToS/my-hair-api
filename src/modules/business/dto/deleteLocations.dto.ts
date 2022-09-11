import { DeleteLocationsInput, Location } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class DeleteLocationsDTO implements DeleteLocationsInput {
  locationsIds: Location['id'][]
  businessId: BusinessEntity['id']
}
