import { CreateBusinessInput } from '@shared/graphql'

import { PickType } from '@nestjs/mapped-types'
import { BusinessEntity } from '@modules/business/entities/business.entity'

export class CreateBusinessDTO
  extends PickType(BusinessEntity, ['name', 'admins_ids'])
  implements CreateBusinessInput {}
