import { UpdateBusinessInput } from '@shared/graphql'

import { PickType } from '@nestjs/mapped-types'
import { BusinessEntity } from '@modules/business/entities/business.entity'

export class UpdateBusinessDTO
  extends PickType(BusinessEntity, ['id'])
  implements UpdateBusinessInput
{
  id: BusinessEntity['id']
}
