import { BusinessEntity } from '../entities/business.entity'
import { ReadBusinessInput } from '@shared/graphql'

export class ReadBusinessDTO implements ReadBusinessInput {
  id: BusinessEntity['id']
}
