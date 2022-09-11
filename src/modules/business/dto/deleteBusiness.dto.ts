import { DeleteBusinessInput } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class DeleteBusinessDTO implements DeleteBusinessInput {
  id: BusinessEntity['id']
}
