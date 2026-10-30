import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'eventDate', title: 'Exhibition date and time', type: 'datetime' }),
    defineField({ name: 'eventLocation', title: 'Exhibition location', type: 'string' }),
    defineField({
      name: 'marqueeImages',
      title: 'Title marquee images',
      description: 'Photos that scroll behind the "REMEMBER US" title on the home page.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),
    defineField({
      name: 'marqueeSpeed', 
      title: 'Marquee loop time (seconds)',
      description: 'How long one full scroll takes. Higher is slower btw',
      type: 'number',
      validation: (r) => r.min(5).max(300),
    }),
  ],
})
