import { readdirSync, readFileSync } from 'fs'
import { join } from 'node:path'
const schemaFolderPath = join(process.cwd(), './gql/server/schemas')

const getSchemaFiles = () => {
  const schemaFiles = readdirSync(schemaFolderPath)
  return schemaFiles.filter((file) => file.endsWith('.graphql'))
}

const typeDefs = (): string[] => {
  const schemaFiles = getSchemaFiles()
  return schemaFiles.map((file) => {
    const filePath = join(schemaFolderPath, file)
    return readFileSync(filePath, 'utf-8')
  })
}

export default typeDefs()
