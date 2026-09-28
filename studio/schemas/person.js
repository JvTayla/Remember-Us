import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / specialisation', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({
      name: 'socials',
      title: 'Social media',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
      }],
    }),
  ],
})
