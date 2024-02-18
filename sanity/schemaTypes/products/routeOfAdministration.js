import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'routeOfAdministration',
  title: 'Route of Administration',
  type: 'document',
  fields: [
    defineField({
      name: 'routeName',
      title: 'Route Name',
      type: 'string',
    }),
    // Add other fields as needed
  ],
})
