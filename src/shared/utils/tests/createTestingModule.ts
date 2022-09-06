import { Test } from '@nestjs/testing'
import { AppModule } from '@src/app'

export async function createTestingModule() {
  const moduleBuilder = Test.createTestingModule({ imports: [AppModule] })

  const compiled = await moduleBuilder.compile()

  const app = compiled.createNestApplication(undefined, { logger: false })

  return await app.init()
}
