import { ReadBusinessesInput } from '@shared/graphql'
import { BusinessEntity } from '../entities/business.entity'

export class ReadBusinessesDTO implements ReadBusinessesInput {
  ids?: BusinessEntity['id'][]
}
