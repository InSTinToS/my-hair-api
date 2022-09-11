import { CreateBusinessInput } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class CreateBusinessDTO implements CreateBusinessInput {
  name: BusinessEntity['name']
  locations?: BusinessEntity['locations']
  thumbnail?: BusinessEntity['thumbnail']
  admins_ids: BusinessEntity['admins_ids']
}
