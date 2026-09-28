import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'subTypes', title: 'Sub-types', type: 'array', of: [{ type: 'string' }] }),
  ],
})
