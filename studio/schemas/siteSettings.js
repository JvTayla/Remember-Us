import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'eventDate', title: 'Exhibition date and time', type: 'datetime' }),
    defineField({ name: 'eventLocation', title: 'Exhibition location', type: 'string' }),
  ],
})
