import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

const definitionsFactory = new GraphQLDefinitionsFactory()

definitionsFactory.generate({
  watch: true,
  outputAs: 'interface',
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), '/src/shared/graphql/index.ts')
})
