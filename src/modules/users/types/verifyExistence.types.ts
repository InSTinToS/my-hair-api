import { UserEntity } from '@modules/users/entities/user.entity'

interface VerifyExistenceParams {
  id?: UserEntity['id']
  email?: UserEntity['email']
  username?: UserEntity['username']
}

interface VerifyExistenceReturn {
  foundUser?: UserEntity
  by: keyof VerifyExistenceParams
}

type VerifyExistence = (
  params: VerifyExistenceParams
) => Promise<VerifyExistenceReturn>

export { VerifyExistence, VerifyExistenceReturn }
