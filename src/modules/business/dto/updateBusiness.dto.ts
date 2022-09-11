import { UpdateBusinessInput } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class UpdateBusinessDTO implements UpdateBusinessInput {
  id: BusinessEntity['id']
  name?: BusinessEntity['name']
  locations?: BusinessEntity['locations']
  admins_ids?: BusinessEntity['admins_ids']
}
