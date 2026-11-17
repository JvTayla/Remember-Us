import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'person' }], validation: (r) => r.required() }),
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'typeOfWork', title: 'Type of work', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'link', title: 'Link', type: 'url' }),
          defineField({
            name: 'media',
            title: 'Images and videos',
            type: 'array',
            of: [
              { type: 'image', options: { hotspot: true } },
              { type: 'file', title: 'Video', options: { accept: 'video/*' } },
            ],
          }),
        ],
      }],
    }),
  ],
})