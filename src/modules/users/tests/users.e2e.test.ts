import { createTestingModule } from '@shared/utils/tests/createTestingModule'

import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  const user = {
    id: undefined,
    password: 'validPassword',
    username: 'validUsername',
    email: 'validEmail@validEmail.com'
  }

  beforeAll(async () => {
    app = await createTestingModule()
  })

  it('should be able to list all users', async () => {
    const query = () => `#graphql
      query Query {
        users {
          id
          email
          avatar
          username
          password
          full_name
          created_at
          updated_at
        }
      }
    `

    const response = await request(app.getHttpServer()).post('/graphql').send({
      query: query()
    })

    expect(response.body.data.users).toBeTruthy()
  })

  it('should be able to create one user', async () => {
    const query = `#graphql
      mutation Mutation($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
          id
          email
          username
          password
        }
      }
    `

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { createUserInput: user }
      })

    const userResponse = response.body.data.createUser

    user.id = userResponse.id

    expect(userResponse).toMatchObject(user)
  })

  it('should be able to read one user', async () => {
    const query = `#graphql
      query Query($readUserInput: ReadUserInput) {
        user(readUserInput: $readUserInput) {
          id
          email
          username
        }
      }
    `

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          readUserInput: {
            id: user.id
          }
        }
      })

    expect(response.body.data.user).toMatchObject({
      email: user.email,
      username: user.username
    })
  })

  it('should be able to update one user', async () => {
    const newFullName = 'newFullName'

    const query = `#graphql
      mutation Mutation($updateUserInput: UpdateUserInput!) {
        updateUser(updateUserInput: $updateUserInput) {
          id
          full_name
        }
      }
    `

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: {
          updateUserInput: { id: user.id, full_name: newFullName }
        }
      })

    expect(response.body.data.updateUser.full_name).toBe(newFullName)
  })

  it('should be able to delete one user', async () => {
    const query = `#graphql
      mutation Mutation($deleteUserInput: DeleteUserInput!) {
        deleteUser(deleteUserInput: $deleteUserInput) {
          id
          email
          username
        }
      }
    `

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables: { deleteUserInput: { id: user.id } }
      })

    expect(response.body.data.deleteUser).toMatchObject({
      email: user.email,
      username: user.username
    })
  })
})
