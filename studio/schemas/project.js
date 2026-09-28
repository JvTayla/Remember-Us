import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: (r) => r.required() }),
    defineField({ name: 'subType', title: 'Sub-type', type: 'string', description: 'e.g. 2D, Stop Motion, Digital (2D/3D)' }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'string', validation: (r) => r.max(160) }),
    defineField({ name: 'overview', title: 'Project overview', type: 'text', rows: 8 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }],
    }),
    defineField({ name: 'team', title: 'Team', type: 'array', of: [{ type: 'reference', to: [{ type: 'person' }] }] }),
    defineField({ name: 'projectLink', title: 'Project link (optional)', type: 'url' }),
  ],
})
