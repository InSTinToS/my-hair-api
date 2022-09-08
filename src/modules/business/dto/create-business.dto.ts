import { CreateBusinessInput, Location } from '@shared/graphql'

export class CreateBusinessDTO implements CreateBusinessInput {
  name: string
  admins_ids?: string[]
  locations?: Location[]
}
