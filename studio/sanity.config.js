import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Remember Us',
  projectId: 'd8g1rpis',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
