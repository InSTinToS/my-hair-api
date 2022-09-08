import { Location, UpdateBusinessInput } from '@shared/graphql'

export class UpdateBusinessDTO implements UpdateBusinessInput {
  name: string
  admins_ids?: string[]
  locations?: Location[]
}
